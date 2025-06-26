<script lang="ts">
    import { type CollectionEntry } from 'astro:content';
    import { filters } from '../../stores/filters.store';
    import Filters from './Filters.svelte';
    
    interface Props {
        allProjects: CollectionEntry<'projects'>[];
    }

    const { allProjects }: Props = $props();
    let sortedProjects: CollectionEntry<'projects'>[] = $state(allProjects);

    function getIntersectionLength(a: any[], b: any[]): number {
        const intersection = a.filter(value => b.includes(value));
        return intersection.length;
    }

    function sortProjects(filters: string[]) {
        if(!filters || filters.length == 0){
            sortedProjects = allProjects.sort((a: any, b: any) => b.data.date.valueOf() - a.data.date.valueOf());
            return;
        }
        
        sortedProjects = allProjects.sort((a: any, b: any) => getIntersectionLength(b.data.tags, filters) - getIntersectionLength(a.data.tags, filters));
    }

    filters.subscribe((value) => {
        sortProjects([...value]);
    })

    function compareTags(a: string, b: string): number {
        const includesA: boolean = $filters.includes(a);
        const includesB: boolean = $filters.includes(b);
        return includesA && includesB ? 0 : includesA ? -1 : 1; 
    }

    function getSortedTags(project: CollectionEntry<'projects'>): string[] {
        const sortedTags: string[] = [...project.data.tags];
        sortedTags.sort((a, b) => compareTags(a, b));
        return sortedTags;
    }
</script>

{#snippet projectCard(project: CollectionEntry<'projects'>)}
    <a href={`/projects/${project.id}`} class="flex flex-col justify-between gap-2 min-h-32 h-full p-2 border rounded-interactive border-edge bg-linear-to-b from-secondary to-secondary/60 pointer-events-auto hover:border-accent duration-200">
        <div>
            <span class="text-sm text-primary-foreground/75">
                <time datetime={project.data.date.toISOString()}>
                    {project.data.date.toLocaleDateString('en-us', {year: 'numeric', month: 'short', day: 'numeric'})}
                </time>
            </span>
            <h2 class="text-lg font-semibold">{project.data.title}</h2>
            <p>{project.data.description}</p>
        </div>
        <div class="flex flex-row gap-2 overflow-hidden text-accent">
            {#each getSortedTags(project) as tag}
                <span class={($filters.length > 0 && !$filters.includes(tag)) ? "opacity-60" : "font-black"}>{tag}</span>
            {/each}
        </div>
    </a>
{/snippet}

<Filters />

<div class="group grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-interactive pointer-events-none hover:border-edge duration-200">					
    {#each sortedProjects as project}
        {@render projectCard(project)}
    {/each}
</div>