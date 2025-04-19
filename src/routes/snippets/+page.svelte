<script lang="ts">
	import MdiCopy from 'virtual:icons/mdi/content-copy';
	import MdiSearch from 'virtual:icons/mdi/magnify';
	import MdiFilter from 'virtual:icons/mdi/filter-remove';
	import MdiClose from 'virtual:icons/mdi/close';
	import CategorySelector from '$lib/components/categorySelector.svelte';
	import FloatingPlusButton from '$lib/components/floatingPlusButton.svelte';
	import CategoryBadge from '$lib/components/categoryBadge.svelte';
	import NoDataFound from '$lib/components/noDataFound.svelte';
	import { showToast } from '$lib/stores/toast';
	import { derived, writable } from 'svelte/store';
	import type { Snippet } from '$lib/types.js';

	const { data } = $props();
	let snippets = data.snippets || [];
	let categories = data.categories || [];

	let selectedCategoryIds: number[] = $state([]);
	const selectedCategoryIdsStore = writable<number[]>([]);

	$effect(() => {
		selectedCategoryIdsStore.set(selectedCategoryIds);
	});

	let search: string = $state('');
	const searchStore = writable('');

	const filteredSnippets = derived(
		[writable(snippets), searchStore, selectedCategoryIdsStore],
		([$snippets, $search, $selectedCategoryIds]) => {
			const query = $search.toLowerCase();

			return $snippets.filter((snippet: Snippet) => {
				return (
					(snippet.title.toLowerCase().includes(query) ||
						snippet.description.toLowerCase().includes(query) ||
						snippet.content.toLowerCase().includes(query)) &&
					($selectedCategoryIds.length === 0 ||
						selectedCategoryIds.every((id) =>
							snippet.categories.some((category) => category.id === id)
						))
				);
			});
		}
	);

	let timeout: ReturnType<typeof setTimeout>;

	function setSearch() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			searchStore.set(search);
		}, 300);
	}

	function clearSearch() {
		search = '';
		searchStore.set('');
	}

	function copyToClipboard(event: Event, text: string) {
		event.stopPropagation();
		event.preventDefault();

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

	function resetFilter() {
		clearSearch();
		selectedCategoryIds = [];
	}
</script>

<div class="mb-5 flex flex-row gap-1">
	<label class="input focus-within:border-primary w-full focus-within:outline-0">
		<MdiSearch class="h-5 w-5" />
		<input type="input" placeholder="Search" bind:value={search} oninput={setSearch} />
		<button class="btn btn-ghost h-7 w-7 p-0" onclick={clearSearch} title="Clear search">
			<MdiClose class="h-5 w-5" />
		</button>
	</label>
	<CategorySelector
		{categories}
		bind:selectedCategoryIds
		indicator={true}
		title="Filter by category"
	/>
	<button class="btn btn-ghost p-2" title="Reset filter" onclick={resetFilter}>
		<MdiFilter class="h-5 w-5" />
	</button>
</div>

{#if $filteredSnippets.length === 0}
	<NoDataFound />
{:else}
	<ul class="list bg-base-100 rounded-box shadow-md">
		{#each $filteredSnippets as snippet (snippet.id)}
			<a class="list-row hover:bg-base-300" href={`/snippets/${snippet.id}`}>
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
						onclick={(event) => copyToClipboard(event, snippet.content)}
					>
						<MdiCopy width={20} height={20} />
					</button>
				</div>
			</a>
		{/each}
	</ul>
{/if}

<FloatingPlusButton href="/snippets/new" title="Add new snippet" />
