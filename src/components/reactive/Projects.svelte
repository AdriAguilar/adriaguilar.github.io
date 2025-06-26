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
        if (filters.length === 0) {
            sortedProjects = allProjects;
            return;
        }
        
        sortedProjects = allProjects.filter(project => {
            // Verificar si el proyecto tiene al menos un tag que coincide con los filtros
            return filters.some(filter => project.data.tags.includes(filter));
        }).sort((a, b) => getIntersectionLength(b.data.tags, filters) - getIntersectionLength(a.data.tags, filters));
    }

    filters.subscribe((value) => {
        sortProjects([...value]);
    })

    // Función para obtener los tags seleccionados sin proyectos
    function getTagsWithoutProjects(): string[] {
        return $filters.filter(tag => !sortedProjects.some(project => project.data.tags.includes(tag)));
    }

    function compareTags(a: string, b: string): number {
        const includesA: boolean = $filters.includes(a);
        const includesB: boolean = $filters.includes(b);
        return includesA && includesB ? 0 : includesA ? -1 : 1; 
    }

    function getSortedTags(project: CollectionEntry<'projects'>): string[] {
        const projectTags = [...project.data.tags];
        return projectTags.sort((a, b) => compareTags(a, b));
    }
</script>

{#snippet projectCard(project: CollectionEntry<'projects'>)}
    <a href={`/projects/${project.id}`} class="flex flex-col justify-between gap-2 min-h-32 h-full p-2 border rounded-interactive border-edge bg-linear-to-b from-secondary to-secondary/60 pointer-events-auto hover:border-accent duration-200">
        <div>
            <div class="flex flex-row justify-between">
                <h2 class="text-xl font-bold">{project.data.title}</h2>
                <time datetime={project.data.date.toISOString()} class="opacity-60 pr-1">
                    {project.data.date.toLocaleDateString("es-ES", { year: "numeric" })}
                </time>
            </div>
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

{#if sortedProjects.length === 0 && $filters.length > 0}
    <div class="group grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-interactive pointer-events-none hover:border-edge duration-200">
        <div class="col-span-full text-center py-4">
            <h3 class="text-xl font-semibold mb-4">Sin proyectos disponibles</h3>
            <p class="text-gray-500">
                No hay proyectos disponibles para las tecnologías seleccionadas:
                <br>
                <span class="font-semibold">{getTagsWithoutProjects().join(', ')}</span>
            </p>
        </div>
    </div>
{:else}
    <div class="group grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-interactive pointer-events-none hover:border-edge duration-200">					
        {#each sortedProjects as project}
            {@render projectCard(project)}
        {/each}
    </div>
{/if}