<script lang="ts">
	import MdiShapeOutline from 'virtual:icons/mdi/shape-outline';
	import CategoryBadge from '$lib/components/categoryBadge.svelte';

	let {
		categories = [],
		selectedCategoryIds = $bindable(),
		indicator = false,
		title = 'Select categories'
	} = $props();
</script>

<div class="dropdown dropdown-end">
	<div tabindex="-1" role="button" class="btn btn-ghost p-2" {title}>
		{#if selectedCategoryIds.length > 0 && indicator}
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
					<CategoryBadge {category} />
					<input
						type="checkbox"
						value={category.id}
						bind:group={selectedCategoryIds}
						class="checkbox checkbox-sm rounded-md"
					/>
				</div>
			</li>
		{/each}
		{#if categories.length === 0}
			<li class="text-xs font-semibold whitespace-nowrap opacity-60">No categories found</li>
		{/if}
	</ul>
</div>
