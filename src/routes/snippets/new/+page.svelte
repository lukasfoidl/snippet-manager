<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import CategorySelector from '$lib/components/categorySelector.svelte';
	import StandardButton from '$lib/components/standardButton.svelte';
	import { showToast } from '$lib/stores/toast.js';
	import { descriptionRegex, titleRegex } from '$lib/utils/regex.js';
	import {
		validateContent,
		validateDescription,
		validateSnippet,
		validateTitle
	} from '$lib/utils/validateSnippet.js';
	import type { ActionResult } from '@sveltejs/kit';

	let title = $state('');
	let description = $state('');
	let content = $state('');

	let titleError = $state('');
	let descriptionError = $state('');
	let contentError = $state('');

	const handleTitleInput = () => {
		const result = validateTitle(title);
		titleError = result.success ? '' : (result.errors.title ?? '');
	};

	const handleDescriptionInput = () => {
		const result = validateDescription(description);
		descriptionError = result.success ? '' : (result.errors.description ?? '');
	};

	const handleContentInput = () => {
		const result = validateContent(content);
		contentError = result.success ? '' : (result.errors.content ?? '');
	};

	const { data } = $props();
	let categories = data.categories || [];

	let selectedCategoryIds = $state([]);

	let loading = $state(false);

	// Called when the form is submitted to validate the inputs before submitting data
	function customEnhance({ cancel }: { cancel: () => void }) {
		const result = validateSnippet(title, description, content);

		if (!result.success) {
			titleError = result.errors.title ?? '';
			descriptionError = result.errors.description ?? '';
			contentError = result.errors.content ?? '';
			cancel();
			return;
		}

		loading = true;

		// Callback function to handle the result of the form submission
		return async ({ result }: { result: ActionResult }) => {
			loading = false;

			if (result.type === 'success') {
				showToast(result.data?.message, 'success');
				goto('/snippets', { invalidateAll: true });
			} else if (result.type === 'failure') {
				showToast(result.data?.error, 'error');
			}
		};
	}
</script>

<form method="post" novalidate use:enhance={customEnhance}>
	<div class="inline-flex w-full gap-5">
		<fieldset class="fieldset w-full">
			<legend class="fieldset-legend text-sm">Title*</legend>
			<input
				type="text"
				name="title"
				bind:value={title}
				oninput={handleTitleInput}
				class="input focus-within:border-primary validator w-full focus-within:outline-0"
				style={titleError.length > 0 ? 'border-color: var(--color-error)' : ''}
				placeholder="Alphabet"
				pattern={titleRegex.source}
				maxlength="20"
			/>
			<div class="inline-flex justify-between">
				<p class="text-error">{titleError}</p>
				<p class="fieldset-label">{title.length}/20</p>
			</div>
		</fieldset>
		<div class="flex flex-col justify-center">
			<CategorySelector {categories} bind:selectedCategoryIds />
			<input type="hidden" name="categoryIds" bind:value={selectedCategoryIds} />
		</div>
	</div>
	<fieldset class="fieldset">
		<legend class="fieldset-legend text-sm">Description</legend>
		<input
			type="text"
			name="description"
			bind:value={description}
			oninput={handleDescriptionInput}
			class="input focus-within:border-primary validator w-full focus-within:outline-0"
			style={descriptionError.length > 0 ? 'border-color: var(--color-error)' : ''}
			placeholder="Latin alphabet"
			pattern={descriptionRegex.source}
			maxlength="50"
		/>
		<div class="inline-flex justify-between">
			<p class="text-error">{descriptionError}</p>
			<p class="fieldset-label">{description.length}/50</p>
		</div>
	</fieldset>
	<fieldset class="fieldset">
		<legend class="fieldset-legend text-sm">Content*</legend>
		<textarea
			name="content"
			bind:value={content}
			oninput={handleContentInput}
			class="input focus-within:border-primary validator h-40 w-full focus-within:outline-0"
			style={contentError.length > 0 ? 'border-color: var(--color-error)' : ''}
			placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
			maxlength="1500"
		></textarea>
		<div class="inline-flex justify-between">
			<p class="text-error">{contentError}</p>
			<p class="fieldset-label">{content.length}/1500</p>
		</div>
	</fieldset>
	<div class="mt-5 inline-flex w-full justify-end gap-2">
		<StandardButton {loading} text="Save" type="submit" />
	</div>
</form>
