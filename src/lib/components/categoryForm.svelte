<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import CategoryBadge from '$lib/components/categoryBadge.svelte';
	import StandardButton from '$lib/components/standardButton.svelte';
	import { t } from '$lib/i18n/wrapper';
	import { showModal } from '$lib/stores/modal';
	import { showToast } from '$lib/stores/toast';
	import { nameRegex } from '$lib/utils/regex';
	import { validateCategory, validateName } from '$lib/utils/validateCategory';
	import type { ActionResult } from '@sveltejs/kit';

	let { category = {}, deleteEnabled = false } = $props();
	let name = $state(category?.name ?? '');
	let hex = $state(category?.color ?? '#d8dee9');

	let nameError = $state('');

	let loading = $state(false);

	const handleNameInput = () => {
		const result = validateName(name);
		nameError = result.success ? '' : (result.errors.name ?? '');
	};

	// Called when the form is submitted to validate the inputs before submitting data
	function customEnhance({ cancel }: { cancel: () => void }) {
		const result = validateCategory(name, hex);

		if (!result.success) {
			nameError = result.errors.name ?? '';
			cancel();
			return;
		}

		loading = true;

		// Callback function to handle the result of the form submission
		return async ({ result }: { result: ActionResult }) => {
			loading = false;

			if (result.type === 'success') {
				showToast(result.data?.message, 'success');
				goto('/categories', { invalidateAll: true });
			} else if (result.type === 'failure') {
				showToast(result.data?.error, 'error');
			}
		};
	}

	function onDelete() {
		showModal(
			'deleteDialog',
			$t('categories.deletion.confirmation.title'),
			$t('categories.deletion.confirmation.description'),
			'/categories/' + category.id + '?/delete',
			'/categories'
		);
	}
</script>

<form method="post" novalidate use:enhance={customEnhance}>
	<div class="inline-flex w-full gap-5">
		<fieldset class="fieldset w-full">
			<legend class="fieldset-legend text-sm">{$t('categories.name.value')}</legend>
			<input
				type="text"
				name="name"
				bind:value={name}
				oninput={handleNameInput}
				class="input focus-within:border-primary validator w-full focus-within:outline-0"
				style={nameError.length > 0 ? 'border-color: var(--color-error)' : ''}
				placeholder={$t('categories.name.placeholder')}
				pattern={nameRegex.source}
				maxlength="20"
			/>
			<div class="inline-flex justify-between">
				<p class="text-error">{nameError}</p>
				<p class="fieldset-label">{name.length}/20</p>
			</div>
		</fieldset>
		<div class="flex flex-col justify-center">
			<input
				type="color"
				name="hex"
				bind:value={hex}
				class="color-picker"
				title={$t('categories.color.hover')}
			/>
		</div>
	</div>
	<fieldset class="fieldset w-full">
		<legend class="fieldset-legend text-sm">{$t('categories.preview')}</legend>
		{#if name.length === 0 || nameError.length > 0}
			<div class="badge badge-sm skeleton h-5 w-10">&nbsp;</div>
		{:else}
			<CategoryBadge category={{ name: name, color: hex }} />
		{/if}
	</fieldset>
	<div class="mt-5 inline-flex w-full justify-end gap-2">
		{#if deleteEnabled}
			<StandardButton
				{loading}
				type="button"
				text={$t('deleteDialog.delete')}
				colorClass="btn-error"
				onClick={onDelete}
			/>
		{/if}
		<StandardButton {loading} formaction="?/save" type="submit" text={$t('categories.submit')} />
	</div>
</form>

<style>
	.color-picker {
		appearance: none;
		-webkit-appearance: none;
		width: 2rem;
		height: 2rem;
		border: none;
		border-radius: 50%;
		overflow: hidden;
		padding: 0;
		cursor: pointer;
	}

	/* Removes the default color picker styling in WebKit browsers */
	.color-picker::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	.color-picker::-webkit-color-swatch {
		border: none;
		border-radius: 50%;
	}

	/* For Firefox */
	.color-picker::-moz-color-swatch {
		border: none;
		border-radius: 50%;
	}
</style>
