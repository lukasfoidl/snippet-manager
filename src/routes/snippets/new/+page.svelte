<script lang="ts">
	import SnippetForm from '$lib/components/snippetForm.svelte';

	let { data } = $props();
	let categories = data.categories || [];
</script>

<SnippetForm {categories} />
