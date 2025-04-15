<script lang="ts">
	import { apiCall } from '$lib/utils/apiCall';
	import SaveButton from '$lib/components/saveButton.svelte';
	import { passwordRegex, usernameRegex } from '$lib/utils/regex';

	let username = $state('');
	let password = $state('');

	let usernameError = $state('');
	let passwordError = $state('');

	const validateUsername = (value: string) => {
		return new RegExp(usernameRegex).test(value);
	};

	const handleUsernameInput = () => {
		if (username.length === 0) {
			usernameError = 'Username is required!';
		} else if (!validateUsername(username)) {
			usernameError = 'Invalid characters!';
		} else {
			usernameError = '';
		}
	};

	const validatePassword = (value: string) => {
		return new RegExp(passwordRegex).test(value);
	};

	const handlePasswordInput = () => {
		if (password.length < 8) {
			passwordError = 'Password needs to be at least 8 characters long!';
		} else if (!validatePassword(password)) {
			passwordError = 'Invalid characters!';
		} else {
			passwordError = '';
		}
	};

	const onRegister = async () => {
		const res = await apiCall(
			'/api/register',
			'POST',
			JSON.stringify({ username: username, password: password }),
			'User created successfully!',
			'Failed creating user!'
		);

		console.log(res);
	};
</script>

<form>
	<fieldset class="fieldset w-full">
		<legend class="fieldset-legend text-sm">Username*</legend>
		<input
			type="text"
			bind:value={username}
			oninput={handleUsernameInput}
			class="input focus-within:border-primary validator w-full focus-within:outline-0"
			style={usernameError.length > 0 ? 'border-color: var(--color-error)' : ''}
			placeholder="Maria78"
			pattern={usernameRegex.source}
			maxlength="20"
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
			bind:value={password}
			oninput={handlePasswordInput}
			class="input focus-within:border-primary validator w-full focus-within:outline-0"
			style={passwordError.length > 0 ? 'border-color: var(--color-error)' : ''}
			pattern={passwordRegex.source}
			maxlength="100"
		/>
		<div class="inline-flex justify-between">
			<p class="text-error">{passwordError}</p>
			<p class="fieldset-label">&nbsp;</p>
		</div>
	</fieldset>
	<div class="mt-5 flex w-full flex-row items-center justify-end gap-3 align-middle">
		<SaveButton onClick={onRegister} text="Register" color="var(--color-accent)" />
		<SaveButton type="submit" onClick={() => console.log(username, password)} text="Login" />
	</div>
</form>
