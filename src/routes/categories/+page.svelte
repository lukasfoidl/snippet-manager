<script lang="ts">
	import CategoryBadge from '$lib/components/categoryBadge.svelte';
	import FloatingPlusButton from '$lib/components/floatingPlusButton.svelte';
	import NoDataFound from '$lib/components/noDataFound.svelte';

	const { data } = $props();
	let categories = data.categories || [];
</script>

{#if categories.length === 0}
	<NoDataFound />
{:else}
	<ul class="list bg-base-100 rounded-box shadow-md">
		{#each categories as category (category.id)}
			<a
				class="list-row hover:bg-base-300 flex w-full justify-between"
				href={`/categories/${category.id}`}
			>
				<CategoryBadge {category} />
				<div class="text-xs font-semibold opacity-60">{category.usage_count}</div>
			</a>
		{/each}
	</ul>
{/if}

<FloatingPlusButton href="/categories/new" title="Add new category" />
