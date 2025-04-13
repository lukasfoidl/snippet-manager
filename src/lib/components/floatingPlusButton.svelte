<script lang="ts">
	import MdiPlus from 'virtual:icons/mdi/plus';

	let { href, title } = $props();
</script>

<a
	role="button"
	{href}
	class="
    btn btn-primary btn-circle fixed right-5 bottom-15.5 z-50 h-15 w-15
    shadow-lg sm:right-[calc(50%-19.75rem+1rem)] md:right-[calc(50%-22.75rem+1rem)] lg:right-[calc(50%-25.75rem+1rem)] xl:right-[calc(50%-29.75rem+1rem)]
"
	{title}
>
	<MdiPlus width={25} height={25} />
</a>
