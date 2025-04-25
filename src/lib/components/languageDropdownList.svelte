<script lang="ts">
	import MdiCheck from 'virtual:icons/mdi/check';
	import Gb from 'svelte-flag-icons/Gb.svelte';
	import De from 'svelte-flag-icons/De.svelte';
	import { i18n } from '$lib/i18n/client';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { showToast } from '$lib/stores/toast';
	import { goto } from '$app/navigation';
	import { languages } from '$lib/types';
	import { t } from '$lib/i18n/wrapper';

	const { currentLang } = $props();

	const extendedLangs = languages.map((lang) => {
		const icon = lang.code === 'en' ? Gb : De;
		return { ...lang, icon };
	});

	// Called when the form is submitted to validate the inputs before submitting data
	function customEnhance() {
		// Callback function to handle the result of the form submission
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success') {
				i18n.changeLanguage(result.data?.lang);
				goto(location.pathname, { invalidateAll: true });
			} else if (result.type === 'failure') {
				showToast(result.data?.error, 'error');
			}
		};
	}
</script>

<form method="POST" action="/auth?/lang" use:enhance={customEnhance}>
	<ul
		tabindex="-1"
		class="menu menu-md dropdown-content rounded-box bg-base-100 text-base-content mt-3 w-25 p-2 shadow"
	>
		{#each extendedLangs as lang}
			<li>
				<button
					type="submit"
					name="lang"
					value={lang.code}
					class="btn btn-ghost justify-between"
					title={$t(lang.translation)}
				>
					<lang.icon />
					<MdiCheck class={currentLang === lang.code ? '' : 'hidden'} />
				</button>
			</li>
		{/each}
	</ul>
</form>
