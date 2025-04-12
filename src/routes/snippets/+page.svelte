<script lang="ts">
	import MdiCopy from 'virtual:icons/mdi/content-copy';
	import MdiPlus from 'virtual:icons/mdi/plus';
	import MdiDatabaseOff from 'virtual:icons/mdi/database-off';
	import MdiSearch from 'virtual:icons/mdi/magnify';
	import MdiFilter from 'virtual:icons/mdi/filter-remove';
	import MdiShapeOutline from 'virtual:icons/mdi/shape-outline';

	const { data } = $props();
	let snippets = data.snippets || [];
	let categories = data.categories || [];

	let filteredCategories = $state([]);
</script>

<div class="mb-5 flex flex-row gap-1">
	<label class="input focus-within:border-primary w-full focus-within:outline-0">
		<MdiSearch class="h-5 w-5" />
		<input type="input" placeholder="Search" />
	</label>
	<div class="dropdown dropdown-end">
		<div tabindex="-1" role="button" class="btn btn-ghost p-2" title="Filter by category">
			{#if filteredCategories.length > 0}
				<div class="indicator">
					<span class="indicator-item status status-primary"></span>
					<MdiShapeOutline class="h-5 w-5" />
				</div>
			{:else}
				<MdiShapeOutline class="h-5 w-5" />
			{/if}
		</div>
		<ul
			tabindex="-1"
			class="dropdown-content rounded-box mt-3 flex flex-col gap-2 bg-white p-3 text-black shadow"
		>
			{#each categories as category (category.id)}
				<li class="h-6">
					<div class="flex flex-row items-center justify-between gap-2 whitespace-nowrap">
						<div class="badge badge-sm border-0" style="background-color: {category.color}">
							{category.name}
						</div>
						<input
							type="checkbox"
							value={category}
							bind:group={filteredCategories}
							class="checkbox checkbox-sm rounded-md"
						/>
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<button class="btn btn-ghost p-2" title="Reset filter">
		<MdiFilter class="h-5 w-5" />
	</button>
</div>

{#if snippets.length === 0}
	<div class="flex h-full flex-col items-center justify-center gap-2">
		<MdiDatabaseOff class="text-primary h-20 w-20" />
		<div class="text-primary">No data found</div>
	</div>
{:else}
	<ul class="list bg-base-100 rounded-box shadow-md">
		{#each snippets as snippet (snippet.id)}
			<li class="list-row hover:bg-base-300">
				<div class="col-span-2 inline-flex justify-between">
					<div>
						<div class="font-bold">{snippet.title}</div>
						<div class="text-xs font-semibold opacity-60">{snippet.description}</div>
					</div>
					<div class="flex flex-wrap justify-end gap-1">
						{#each snippet.categories as category (category.id)}
							<div
								class="badge badge-sm border-0 whitespace-nowrap"
								style="background-color: {category.color}"
							>
								{category.name}
							</div>
						{/each}
					</div>
				</div>
				<div class="list-col-wrap col-span-2 inline-flex items-center justify-between gap-1">
					<p class="line-clamp-3 text-xs">{snippet.content}</p>
					<div role="button" class="btn btn-ghost h-15 w-15 p-0" title="Copy to clipboard">
						<MdiCopy width={20} height={20} />
					</div>
				</div>
			</li>
		{/each}
	</ul>
{/if}
<a
	role="button"
	href="/snippets/new"
	class="
    btn btn-primary btn-circle fixed right-5 bottom-15.5 z-50 h-15 w-15
    shadow-lg sm:right-[calc(50%-19.75rem+1rem)] md:right-[calc(50%-22.75rem+1rem)] lg:right-[calc(50%-25.75rem+1rem)] xl:right-[calc(50%-29.75rem+1rem)]
"
	title="Add new snippet"
>
	<MdiPlus class="text-white" width={25} height={25} />
</a>
