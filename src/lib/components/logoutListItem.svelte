<script lang="ts">
	import MdiLogout from 'virtual:icons/mdi/logout';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/stores/toast';
	import { t } from '$lib/i18n/wrapper';

	export let data;

	// Called when the form is submitted to validate the inputs before submitting data
	function customEnhance() {
		// Callback function to handle the result of the form submission
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				showToast(result.data?.message, 'success');
				goto('/', { invalidateAll: true });
			} else if (result.type === 'failure') {
				showToast(result.data?.error, 'error');
			}
		};
	}
</script>

<div class="pb-1 pl-1 text-xs font-semibold opacity-60">{data.user.username}</div>
<form method="post" action="/auth?/logout" use:enhance={customEnhance}>
	<li>
		<button><MdiLogout />{$t('layout.logout')}</button>
	</li>
</form>
