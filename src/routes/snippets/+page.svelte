<script lang="ts">
	import MdiCopy from 'virtual:icons/mdi/content-copy';
	import MdiSearch from 'virtual:icons/mdi/magnify';
	import MdiFilter from 'virtual:icons/mdi/filter-remove';
	import CategorySelector from '$lib/components/categorySelector.svelte';
	import FloatingPlusButton from '$lib/components/floatingPlusButton.svelte';
	import CategoryBadge from '$lib/components/categoryBadge.svelte';
	import NoDataFound from '$lib/components/noDataFound.svelte';
	import { showToast } from '$lib/stores/toast';

	const { data } = $props();
	let snippets = data.snippets || [];
	let categories = data.categories || [];

	let selectedCategoryIds = $state([]);

	function copyToClipboard(text: string) {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				showToast('Copied to clipboard!', 'success');
			})
			.catch((err) => {
				console.log(err);
				showToast('Failed copying to clipboard', 'error');
			});
	}
</script>

<div class="mb-5 flex flex-row gap-1">
	<label class="input focus-within:border-primary w-full focus-within:outline-0">
		<MdiSearch class="h-5 w-5" />
		<input type="input" placeholder="Search" />
	</label>
	<CategorySelector
		{categories}
		bind:selectedCategoryIds
		indicator={true}
		title="Filter by category"
	/>
	<button class="btn btn-ghost p-2" title="Reset filter">
		<MdiFilter class="h-5 w-5" />
	</button>
</div>

{#if snippets.length === 0}
	<NoDataFound />
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
							<CategoryBadge {category} />
						{/each}
					</div>
				</div>
				<div class="list-col-wrap col-span-2 inline-flex items-center justify-between gap-1">
					<p class="line-clamp-3 text-xs">{snippet.content}</p>
					<button
						class="btn btn-ghost h-15 w-15 p-0 hover:border-transparent hover:bg-transparent"
						title="Copy to clipboard"
						onclick={() => copyToClipboard(snippet.content)}
					>
						<MdiCopy width={20} height={20} />
					</button>
				</div>
			</li>
		{/each}
	</ul>
{/if}

<FloatingPlusButton href="/snippets/new" title="Add new snippet" />
