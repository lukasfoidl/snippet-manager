<script lang="ts">
	import { goto } from '$app/navigation';
	import CategoryForm from '$lib/components/categoryForm.svelte';
	import { showToast } from '$lib/stores/toast.js';
	import type { Category } from '$lib/types.js';

	const { data } = $props();
	let category: Category | undefined = data.category;

	$effect(() => {
		if (!category) {
			showToast('Category not found', 'error');
			goto('/categories');
		}
	});
</script>

{#if category}
	<CategoryForm {category} deleteEnabled={true} />
{/if}
