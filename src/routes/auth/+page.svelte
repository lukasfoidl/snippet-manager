<script lang="ts">
	import StandardButton from '$lib/components/standardButton.svelte';
	import { passwordRegex, usernameRegex } from '$lib/utils/regex';
	import { enhance } from '$app/forms';
	import { validatePassword, validateUser, validateUsername } from '$lib/utils/validateUser.js';
	import { type ActionResult } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { showToast } from '$lib/stores/toast.js';

	let loading = $state(false);

	let username = $state('');
	let password = $state('');

	let usernameError = $state('');
	let passwordError = $state('');

	const handleUsernameInput = () => {
		const result = validateUsername(username);
		usernameError = result.success ? '' : (result.errors.username ?? '');
	};

	const handlePasswordInput = () => {
		const result = validatePassword(password);
		passwordError = result.success ? '' : (result.errors.password ?? '');
	};

	// Called when the form is submitted to validate the inputs before submitting data
	function customEnhance({ cancel }: { cancel: () => void }) {
		const result = validateUser(username, password);

		if (!result.success) {
			usernameError = result.errors.username ?? '';
			passwordError = result.errors.password ?? '';
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
	<fieldset class="fieldset w-full">
		<legend class="fieldset-legend text-sm">Username*</legend>
		<input
			type="text"
			name="username"
			bind:value={username}
			oninput={handleUsernameInput}
			class="input focus-within:border-primary validator w-full focus-within:outline-0"
			style={usernameError.length > 0 ? 'border-color: var(--color-error)' : ''}
			placeholder="Maria78"
			pattern={usernameRegex.source}
			maxlength={20}
		/>
		<div class="inline-flex justify-between">
			<p class="text-error">{usernameError}</p>
			<p class="fieldset-label">{username.length}/20</p>
		</div>
	</fieldset>
	<fieldset class="fieldset">
		<legend class="fieldset-legend text-sm">Password*</legend>
		<input
			type="password"
			name="password"
			bind:value={password}
			oninput={handlePasswordInput}
			class="input focus-within:border-primary validator w-full focus-within:outline-0"
			style={passwordError.length > 0 ? 'border-color: var(--color-error)' : ''}
			pattern={passwordRegex.source}
			maxlength={100}
		/>
		<div class="inline-flex justify-between">
			<p class="text-error">{passwordError}</p>
			<p class="fieldset-label">&nbsp;</p>
		</div>
	</fieldset>
	<div class="mt-5 flex w-full flex-row items-center justify-end gap-3 align-middle">
		<!-- Used for calling login endpoint on pressing enter -->
		<button disabled={loading} formaction="?/login" type="submit" class="hidden">X</button>

		<StandardButton
			{loading}
			formaction="?/register"
			type="submit"
			text="Register"
			colorClass="btn-accent"
		/>
		<StandardButton {loading} formaction="?/login" type="submit" text="Login" />
	</div>
</form>
