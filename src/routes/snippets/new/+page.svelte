<script lang="ts">
	import CategorySelector from '$lib/components/categorySelector.svelte';
	import SaveButton from '$lib/components/saveButton.svelte';
	import { contentRegex, descriptionRegex, titleRegex } from '$lib/utils/regex.js';

	let title = $state('');
	let description = $state('');
	let content = $state('');

	let titleError = $state('');
	let descriptionError = $state('');
	let contentError = $state('');

	const validateTitle = (value: string) => {
		return new RegExp(titleRegex).test(value);
	};

	const handleTitleInput = () => {
		if (title.length === 0) {
			titleError = 'Title is required!';
		} else if (!validateTitle(title)) {
			titleError = 'Invalid characters!';
		} else {
			titleError = '';
		}
	};

	const validateDescription = (value: string) => {
		return new RegExp(descriptionRegex).test(value);
	};

	const handleDescriptionInput = () => {
		if (!validateDescription(description)) {
			descriptionError = 'Invalid characters!';
		} else {
			descriptionError = '';
		}
	};

	const validateContent = (value: string) => {
		return new RegExp(contentRegex).test(value);
	};

	const handleContentInput = () => {
		if (content.length === 0) {
			contentError = 'Content is required!';
		} else if (!validateContent(content)) {
			contentError = 'Invalid characters!';
		} else {
			contentError = '';
		}
	};

	const { data } = $props();
	let categories = data.categories || [];

	let selectedCategoryIds = $state([]);
</script>

<form>
	<div class="inline-flex w-full gap-5">
		<fieldset class="fieldset w-full">
			<legend class="fieldset-legend text-sm">Title*</legend>
			<input
				type="text"
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
		</div>
	</div>
	<fieldset class="fieldset">
		<legend class="fieldset-legend text-sm">Description</legend>
		<input
			type="text"
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
		<SaveButton
			onClick={() => console.log(title, description, content, selectedCategoryIds)}
			text="Save"
			type="submit"
		/>
	</div>
</form>
