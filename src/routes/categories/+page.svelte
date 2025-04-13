<script lang="ts">
	import CategoryBadge from '$lib/components/categoryBadge.svelte';
	import FloatingPlusButton from '$lib/components/floatingPlusButton.svelte';
	import NoDataFound from '$lib/components/noDataFound.svelte';

	const { data } = $props();
</script>

{#if data.categories.length === 0}
	<NoDataFound />
{/if}
<ul class="list bg-base-100 rounded-box shadow-md">
	{#each data.categories as category (category.id)}
		<li class="list-row hover:bg-base-300 flex justify-between">
			<CategoryBadge {category} />
			<div class="text-xs font-semibold opacity-60">{category.times_used}</div>
		</li>
	{/each}
</ul>

<FloatingPlusButton href="/categories/new" title="Add new category" />
