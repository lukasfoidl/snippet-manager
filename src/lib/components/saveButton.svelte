<script lang="ts">
	let {
		onClick,
		text,
		type = 'button',
		color = 'var(--color-primary)'
	}: {
		onClick: () => void;
		text: string;
		type?: 'button' | 'submit' | 'reset';
		color?: string;
	} = $props();
</script>

<button
	{type}
	class="btn btn-primary w-25"
	style="background-color: {color}; border-color: {color}"
	onclick={onClick}>{text}</button
>
