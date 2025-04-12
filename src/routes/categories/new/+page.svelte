<script>
	import ColorPicker from 'svelte-awesome-color-picker';

	let hex = '#000000';
</script>

<ColorPicker bind:hex label="" position="responsive" />

<button class="btn btn-primary" onclick={() => console.log(hex)}>Save</button>
