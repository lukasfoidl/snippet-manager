<script lang="ts">
	let {
		text,
		type = 'button',
		colorClass = 'btn-primary',
		formaction = '',
		disabled = false,
		loading = false,
		onClick = () => {}
	}: {
		text: string;
		type?: 'button' | 'submit' | 'reset';
		colorClass?: string;
		formaction?: string;
		disabled?: boolean;
		loading?: boolean;
		onClick?: () => void;
	} = $props();
</script>

<button {type} {formaction} {disabled} class="btn {colorClass} w-25" onclick={onClick}>
	{#if loading}
		<div class="loading loading-spinner loading-xs"></div>
	{:else}
		{text}
	{/if}
</button>
