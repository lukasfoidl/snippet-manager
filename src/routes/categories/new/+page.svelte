<script lang="ts">
	import CategoryBadge from '$lib/components/categoryBadge.svelte';
	import SaveButton from '$lib/components/saveButton.svelte';
	import ColorPicker from 'svelte-awesome-color-picker';

	let hex = $state('#d8dee9');

	let name = $state('');
	let nameError = $state('');
	let nameRegex = /^[a-zA-Z0-9 öäüÖÄÜß#&\-]{1,20}$/;

	const validateName = (value: string) => {
		return new RegExp(nameRegex).test(value);
	};

	const handleNameInput = () => {
		if (name.length === 0) {
			nameError = 'Name is required!';
		} else if (!validateName(name)) {
			nameError = 'Invalid characters!';
		} else {
			nameError = '';
		}
	};
</script>

<div class="inline-flex w-full gap-5">
	<fieldset class="fieldset w-full">
		<legend class="fieldset-legend text-sm">Name*</legend>
		<input
			type="text"
			bind:value={name}
			oninput={handleNameInput}
			class="input focus-within:border-primary validator w-full focus-within:outline-0"
			style={nameError.length > 0 ? 'border-color: var(--color-error)' : ''}
			placeholder="Alphabet"
			pattern={nameRegex.source}
			maxlength="20"
		/>
		<div class="inline-flex justify-between">
			<p class="text-error">{nameError}</p>
			<p class="fieldset-label">{name.length}/20</p>
		</div>
	</fieldset>
	<div class="flex flex-col justify-center">
		<ColorPicker bind:hex label="" position="responsive" />
	</div>
</div>
<fieldset class="fieldset w-full">
	<legend class="fieldset-legend text-sm">Preview</legend>
	{#if name.length === 0 || nameError.length > 0}
		<div class="badge badge-sm skeleton bg-info h-5 w-10">&nbsp;</div>
	{:else}
		<CategoryBadge category={{ name: name, color: hex }} />
	{/if}
</fieldset>
<div class="mt-5 inline-flex w-full justify-end gap-2">
	<SaveButton onClick={() => console.log(name, hex)} text="Save" />
</div>
