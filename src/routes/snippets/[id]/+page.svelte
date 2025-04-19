<script lang="ts">
	import { goto } from '$app/navigation';
	import SnippetForm from '$lib/components/snippetForm.svelte';
	import { showToast } from '$lib/stores/toast.js';
	import type { Snippet } from '$lib/types.js';

	let { data } = $props();
	let snippet: Snippet | undefined = data.snippet;
	let categories = data.categories || [];

	$effect(() => {
		if (!snippet) {
			showToast('Snippet not found!', 'error');
			goto('/snippets');
		}
	});
</script>

<SnippetForm {snippet} {categories} deleteEnabled={true} />
