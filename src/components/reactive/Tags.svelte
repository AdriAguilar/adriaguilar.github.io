<script lang="ts">
    import { filters, toggleFilter } from '../../stores/filters.store.ts';
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { cn } from '../../styles/cn.ts';
    import data from '../../data/tags.json';

    interface Props {
        tags: string[];
    }

    const { tags }: Props = $props();
    const otherTags = data.tags;

    const allTags = [...new Set([...tags, ...otherTags])];

    allTags.sort((a, b) => {
        const includesA = $filters.includes(a);
        const includesB = $filters.includes(b);
        return includesA && includesB ? 0 : includesA ? -1 : 1;
    });

    let isMounted: boolean = $state(false);

    onMount(() => {
        isMounted = true;
    })
</script>

{#snippet tag(title: string)}
    {#if isMounted}
        <button onclick={() => toggleFilter(title)} in:fade={{duration: 400 + Math.random() * 600, delay: Math.random() * 1000}} class={cn($filters.includes(title) ? "opacity-65" : "", "inline-block w-fit h-fit px-2 py-1 bg-transparent border rounded-interactive border-accent text-accent font-semibold hover:bg-accent hover:text-primary hover:cursor-pointer duration-200")}>
            {title}
        </button>
    {/if}
{/snippet}

<div class="flex flex-row flex-wrap justify-center gap-2 mt-4 text-lg">
    {#each allTags as title}
        {@render tag(title)}
    {/each}
</div>