<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	export let title: string;
	export let description: string;
	export let imageUrlLight: string;
	export let imageUrlDark: string;
	export let aligned: 'left' | 'right' = 'left';
	export let alt: string;

	let mounted = false;
	let imageUrl: string = imageUrlLight; // fallback for SSR

	onMount(() => {
		mounted = true;
		theme.subscribe(($theme) => {
			imageUrl = $theme === 'blueberry-dark' ? imageUrlDark : imageUrlLight;
		});
	});
</script>

<div class="hero">
	<div
		class="hero-content flex-col gap-7 {aligned === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'}"
	>
		{#if mounted}
			<img src={imageUrl} class="customSize rounded-lg shadow-2xl" {alt} />
		{:else}
			<div class="skeleton customSize"></div>
		{/if}
		<div>
			<div class="pb-3 text-xl font-bold">{title}</div>
			<div class="text-md">
				{description}
			</div>
		</div>
	</div>
</div>

<style>
	.customSize {
		min-width: 250px;
		min-height: 377px;
	}

	@media (min-width: 448px) {
		.customSize {
			min-width: 350px;
			min-height: 529px;
		}
	}
</style>
