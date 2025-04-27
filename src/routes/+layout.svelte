<script lang="ts">
	import '../app.css';
	import MdiText from 'virtual:icons/mdi/text';
	import MdiLogin from 'virtual:icons/mdi/login';
	import MdiShapeOutline from 'virtual:icons/mdi/shape-outline';
	import MdiMenu from 'virtual:icons/mdi/menu';
	import MdiUser from 'virtual:icons/mdi/account';
	import MdiMoon from 'virtual:icons/mdi/moon-waning-crescent';
	import MdiSun from 'virtual:icons/mdi/white-balance-sunny';
	import MdiTranslate from 'virtual:icons/mdi/translate';
	import Toast from '$lib/components/toast.svelte';
	import { toastMessage, toastType } from '$lib/stores/toast';
	import LogoutListItem from '$lib/components/logoutListItem.svelte';
	import DeleteDialog from '$lib/components/deleteDialog.svelte';
	import LanguageDropdownList from '$lib/components/languageDropdownList.svelte';
	import { initialized, t } from '$lib/i18n/wrapper';
	import { i18n } from '$lib/i18n/client';
	import { theme } from '$lib/stores/theme';
	import { derived } from 'svelte/store';

	const { data, children } = $props();

	i18n.changeLanguage(data.lang); // set initial correct server language

	let showLangDropdown = $state(false);

	const darkmode = derived(theme, ($theme) => $theme === 'blueberry-dark');

	function toggleTheme() {
		$theme = $theme === 'blueberry-light' ? 'blueberry-dark' : 'blueberry-light';
		(document.activeElement as HTMLElement)?.blur();
	}

	function toggleLangDropdown() {
		showLangDropdown = !showLangDropdown;
	}

	function resetDropdowns() {
		// Defer the reset to give the click event a chance to fire
		setTimeout(() => {
			showLangDropdown = false;
		}, 100);
	}
</script>

{#if !initialized}
	<div>Please wait...</div>
{:else}
	<div class="navbar bg-primary fixed z-999 h-12 min-h-12 text-white shadow-sm">
		<div class="navbar-start">
			<a
				class="btn btn-ghost hover:bg-primary hover:border-primary text-lg hover:text-white"
				href="/">Snippet Manager</a
			>
		</div>
		<div class="navbar-center hidden md:flex">
			<ul class="menu menu-horizontal px-1">
				<li><a href="/snippets"><MdiText />{$t('layout.snippets')}</a></li>
				<li><a href="/categories"><MdiShapeOutline />{$t('layout.categories')}</a></li>
			</ul>
		</div>
		<div class="navbar-end">
			<div class="hidden gap-2 md:flex">
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="btn btn-ghost px-2" title={$t('layout.language')}>
						<MdiTranslate class="h-5 w-5" />
					</div>
					<LanguageDropdownList currentLang={data.lang} />
				</div>
				<button
					class="btn btn-ghost px-2"
					onclick={toggleTheme}
					title={$darkmode ? $t('layout.lightmode') : $t('layout.darkmode')}
				>
					{#if $darkmode}
						<MdiSun class="h-5 w-5" />
					{:else}
						<MdiMoon class="h-5 w-5" />
					{/if}
				</button>
				{#if data.user === undefined}
					<a role="button" class="btn btn-ghost px-2" href="/auth" title={$t('layout.login')}>
						<MdiLogin class="h-5 w-5" />
					</a>
				{:else}
					<div class="dropdown dropdown-end">
						<div
							tabindex="0"
							role="button"
							class="btn btn-ghost px-2"
							title={$t('layout.userMenu')}
						>
							<MdiUser class="h-5 w-5" />
						</div>
						<ul
							tabindex="-1"
							class="menu menu-md dropdown-content rounded-box bg-base-100 text-base-content mt-3 w-40 p-2 shadow"
						>
							<LogoutListItem {data} />
						</ul>
					</div>
				{/if}
			</div>
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost md:hidden" title={$t('layout.menu')}>
					<MdiMenu class="h-5 w-5" />
				</div>
				<ul
					tabindex="-1"
					class="menu menu-md dropdown-content rounded-box bg-base-100 text-base-content mt-3 w-40 p-2 shadow"
				>
					<li><a href="/snippets"><MdiText />{$t('layout.snippets')}</a></li>
					<li><a href="/categories"><MdiShapeOutline />{$t('layout.categories')}</a></li>
					<div class="divider m-0"></div>
					<div id="dropdown" class="dropdown dropdown-end">
						<li>
							<button onclick={toggleLangDropdown} onblur={resetDropdowns}>
								<MdiTranslate />{$t('layout.language')}
							</button>
						</li>
						{#if showLangDropdown}
							<LanguageDropdownList currentLang={data.lang} />
						{/if}
					</div>
					<li>
						<button onclick={toggleTheme}>
							{#if $darkmode}
								<MdiSun />{$t('layout.lightmode')}
							{:else}
								<MdiMoon />{$t('layout.darkmode')}
							{/if}
						</button>
					</li>
					<div class="divider m-0"></div>
					{#if data.user === undefined}
						<li><a href="/auth"><MdiLogin />Login</a></li>
					{:else}
						<LogoutListItem {data} />
					{/if}
				</ul>
			</div>
		</div>
	</div>

	<div class="mt-12 flex h-full flex-col items-center overflow-auto">
		<main
			class="min-w-full flex-1 p-5 sm:max-w-xl sm:min-w-xl md:max-w-2xl md:min-w-2xl lg:max-w-3xl lg:min-w-3xl xl:max-w-4xl xl:min-w-4xl"
		>
			{@render children()}
		</main>

		<footer class="footer footer-horizontal footer-center bg-secondary text-base-content gap-3 p-5">
			<div class="grid grid-flow-col gap-4">
				<a class="link link-hover" href="/imprint">Imprint</a>
				<a class="link link-hover" href="/faq">FAQ</a>
			</div>
			<div>
				<p>© Lukas Foidl 2025 - All rights reserved</p>
			</div>
		</footer>
	</div>

	<Toast message={$toastMessage} type={$toastType} />
	<DeleteDialog />
{/if}
