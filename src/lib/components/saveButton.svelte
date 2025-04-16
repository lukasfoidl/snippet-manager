<script lang="ts">
	let {
		text,
		type = 'button',
		color = 'var(--color-primary)',
		formaction = ''
	}: {
		text: string;
		type?: 'button' | 'submit' | 'reset';
		color?: string;
		formaction?: string;
	} = $props();
</script>

<button
	{type}
	{formaction}
	class="btn btn-primary w-25"
	style="background-color: {color}; border-color: {color}">{text}</button
>
