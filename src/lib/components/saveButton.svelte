<script lang="ts">
	let {
		text,
		type = 'button',
		color = 'var(--color-primary)',
		formaction = '',
		disabled = false
	}: {
		text: string;
		type?: 'button' | 'submit' | 'reset';
		color?: string;
		formaction?: string;
		disabled?: boolean;
	} = $props();
</script>

<button
	{type}
	{formaction}
	{disabled}
	class="btn btn-primary w-25"
	style="background-color: {color}; border-color: {color}">{text}</button
>
