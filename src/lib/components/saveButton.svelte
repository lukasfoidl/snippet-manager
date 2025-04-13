<script lang="ts">
	let { onClick, text, color = 'var(--color-primary)' } = $props();
</script>

<button
	class="btn btn-primary w-25"
	style="background-color: {color}; border-color: {color}"
	onclick={onClick}>{text}</button
>
