<script lang="ts">
	import '../app.css';
	import MdiText from 'virtual:icons/mdi/text';
	import MdiLogin from 'virtual:icons/mdi/login';
	import MdiShapeOutline from 'virtual:icons/mdi/shape-outline';
	import MdiMenu from 'virtual:icons/mdi/menu';
	import MdiMoon from 'virtual:icons/mdi/moon-waning-crescent';
	import MdiTranslate from 'virtual:icons/mdi/translate';

	let { children } = $props();

	function changeLanguage(e: Event) {
		console.log('language');
		(e?.currentTarget as HTMLElement)?.blur();
	}

	function changeTheme(e: Event) {
		console.log('darkmode');
		(e?.currentTarget as HTMLElement)?.blur();
	}
</script>

<div class="navbar bg-primary fixed z-999 h-12 min-h-12 text-white shadow-sm">
	<div class="navbar-start">
		<a class="btn btn-ghost hover:bg-primary hover:border-primary text-lg hover:text-white" href="/"
			>Snippet Manager</a
		>
	</div>
	<div class="navbar-center hidden md:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/snippets"><MdiText />Snippets</a></li>
			<li><a href="/categories"><MdiShapeOutline />Categories</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<div class="hidden gap-2 md:flex">
			<a role="button" class="btn btn-ghost px-2" href="/login">
				<MdiLogin width={20} height={20} />
			</a>
			<button class="btn btn-ghost px-2" onclick={changeLanguage}>
				<MdiTranslate width={20} height={20} />
			</button>
			<button class="btn btn-ghost px-2" onclick={changeTheme}>
				<MdiMoon width={20} height={20} />
			</button>
		</div>
		<div class="dropdown dropdown-end">
			<div tabindex="-1" role="button" class="btn btn-ghost md:hidden">
				<MdiMenu width={20} height={20} />
			</div>
			<ul
				tabindex="-1"
				class="menu menu-md dropdown-content rounded-box mt-3 w-40 bg-white p-2 text-black shadow"
			>
				<li><a href="/snippets"><MdiText />Snippets</a></li>
				<li><a href="/categories"><MdiShapeOutline />Categories</a></li>
				<li><a href="/login"><MdiLogin />Login</a></li>
				<div class="divider m-0"></div>
				<li><button onclick={changeLanguage}><MdiTranslate />Language</button></li>
				<li><button onclick={changeTheme}><MdiMoon />Darkmode</button></li>
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

	<footer class="footer footer-horizontal footer-center bg-base-300 text-base-content gap-3 p-5">
		<div class="grid grid-flow-col gap-4">
			<a class="link link-hover" href="/imprint">Imprint</a>
			<a class="link link-hover" href="/faq">FAQ</a>
		</div>
		<div>
			<p>© Lukas Foidl 2025 - All rights reserved</p>
		</div>
	</footer>
</div>
