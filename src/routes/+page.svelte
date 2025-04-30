<script>
	import { goto } from '$app/navigation';
	import HeroComponent from '$lib/components/heroComponent.svelte';
	import StandardButton from '$lib/components/standardButton.svelte';
	import { t } from '$lib/i18n/wrapper.js';
</script>

<HeroComponent
	title={$t('home.p1.title')}
	description={$t('home.p1.text')}
	imageUrlLight={'/snippets_list_light.png'}
	imageUrlDark={'/snippets_list_dark.png'}
	aligned="left"
	alt={$t('home.p1.alt')}
/>
<HeroComponent
	title={$t('home.p2.title')}
	description={$t('home.p2.text')}
	imageUrlLight={'/categories_list_light.png'}
	imageUrlDark={'/categories_list_dark.png'}
	aligned="right"
	alt={$t('home.p2.alt')}
/>
<HeroComponent
	title={$t('home.p3.title')}
	description={$t('home.p3.text')}
	imageUrlLight={'/snippets_edit_dark.png'}
	imageUrlDark={'/snippets_edit_light.png'}
	aligned="left"
	alt={$t('home.p3.alt')}
/>
<div class="mt-12 mb-12 flex flex-col items-center gap-3">
	<div class="text-center">
		{$t('home.callToAction')}
	</div>
	<StandardButton
		text={$t('auth.registration.submit')}
		colorClass="btn-accent"
		onClick={() => goto('/auth')}
	/>
</div>
