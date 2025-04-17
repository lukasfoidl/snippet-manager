<script lang="ts">
	let {
		text,
		type = 'button',
		color = 'var(--color-primary)',
		formaction = '',
		disabled = false,
		loading = false
	}: {
		text: string;
		type?: 'button' | 'submit' | 'reset';
		color?: string;
		formaction?: string;
		disabled?: boolean;
		loading?: boolean;
	} = $props();
</script>

<button
	{type}
	{formaction}
	{disabled}
	class="btn btn-primary w-25"
	style="background-color: {!disabled && color}; border-color: {!disabled && color}"
>
	{#if loading}
		<div class="loading loading-spinner loading-xs"></div>
	{:else}
		{text}
	{/if}
</button>
