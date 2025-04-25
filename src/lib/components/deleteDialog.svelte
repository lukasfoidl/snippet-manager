<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { closeModal, modal } from '$lib/stores/modal';
	import { showToast } from '$lib/stores/toast';
	import type { ActionResult } from '@sveltejs/kit';
	import StandardButton from './standardButton.svelte';
	import { t } from '$lib/i18n/wrapper';

	const modalId = 'deleteDialog';

	let loading = $state(false);

	// Called when the form is submitted to validate the inputs before submitting data
	function customEnhance() {
		loading = true;

		// Callback function to handle the result of the form submission
		return async ({ result }: { result: ActionResult }) => {
			closeModal(modalId);
			loading = false;
			if (result.type === 'success') {
				showToast(result.data?.message, 'success');
				goto($modal.goto || '/', { invalidateAll: true });
			} else if (result.type === 'failure') {
				showToast(result.data?.error, 'error');
			}
		};
	}
</script>

<dialog id={modalId} class="modal">
	<div class="modal-box">
		<div class="text-md">{$modal.text}</div>
		<div class="text-xs font-semibold opacity-60">{$modal.description}</div>
		<div class="mt-5 inline-flex w-full justify-end gap-2">
			<form method="post" use:enhance={customEnhance}>
				<StandardButton
					{loading}
					formaction={$modal.action || '/'}
					colorClass="btn-error"
					text={$t('deleteDialog.delete')}
					type="submit"
				/>
			</form>
			<StandardButton
				{loading}
				colorClass="btn-info"
				text={$t('deleteDialog.cancel')}
				type="button"
				onClick={() => closeModal(modalId)}
			/>
		</div>
	</div>

	<!-- Close by clicking outside -->
	<form method="dialog" class="modal-backdrop">
		<button>Close</button>
	</form>
</dialog>
