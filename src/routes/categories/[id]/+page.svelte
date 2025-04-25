<script lang="ts">
	import { goto } from '$app/navigation';
	import CategoryForm from '$lib/components/categoryForm.svelte';
	import { t } from '$lib/i18n/wrapper.js';
	import { showToast } from '$lib/stores/toast.js';
	import type { Category } from '$lib/types.js';

	const { data } = $props();
	let category: Category | undefined = data.category;

	$effect(() => {
		if (!category) {
			showToast($t('categories.notFound'), 'error');
			goto('/categories');
		}
	});
</script>

{#if category}
	<CategoryForm {category} deleteEnabled={true} />
{/if}
