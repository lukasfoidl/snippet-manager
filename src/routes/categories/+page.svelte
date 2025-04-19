<script lang="ts">
	import { goto } from '$app/navigation';
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
			<button
				class="list-row hover:bg-base-300 flex w-full cursor-pointer justify-between text-left"
				type="button"
				onclick={() => goto(`/categories/${category.id}`)}
			>
				<CategoryBadge {category} />
				<div class="text-xs font-semibold opacity-60">{category.usage_count}</div>
			</button>
		{/each}
	</ul>
{/if}

<FloatingPlusButton href="/categories/new" title="Add new category" />
