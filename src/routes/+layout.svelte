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

<div class="navbar bg-primary h-12 min-h-0 text-white shadow-sm">
	<div class="navbar-start">
		<a class="btn btn-ghost hover:bg-primary hover:border-primary text-lg hover:text-white" href="/"
			>Snippet Manager</a
		>
	</div>
	<div class="navbar-center hidden md:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/"><MdiText />Snippets</a></li>
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
				class="menu menu-md dropdown-content rounded-box z-1 mt-3 w-40 bg-white p-2 text-black shadow"
			>
				<li><a href="/"><MdiText />Snippets</a></li>
				<li><a href="/categories"><MdiShapeOutline />Categories</a></li>
				<li><a href="/login"><MdiLogin />Login</a></li>
				<div class="divider m-0"></div>
				<li><button onclick={changeLanguage}><MdiTranslate />Language</button></li>
				<li><button onclick={changeTheme}><MdiMoon />Darkmode</button></li>
			</ul>
		</div>
	</div>
</div>

<main class="m-5">
	{@render children()}
</main>
