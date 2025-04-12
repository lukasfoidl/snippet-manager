<script lang="ts">
	import MdiPlus from 'virtual:icons/mdi/plus';
	import MdiDatabaseOff from 'virtual:icons/mdi/database-off';

	const { data } = $props();
</script>

{#if data.categories.length === 0}
	<div class="flex h-full flex-col items-center justify-center gap-2">
		<MdiDatabaseOff class="text-primary h-20 w-20" />
		<div class="text-primary">No data found</div>
	</div>
{/if}
<ul class="list bg-base-100 rounded-box shadow-md">
	{#each data.categories as category (category.id)}
		<li class="list-row hover:bg-base-300 flex justify-between">
			<div class="badge badge-sm border-0" style="background-color: {category.color}">
				{category.name}
			</div>
			<div class="text-xs font-semibold opacity-60">{category.times_used}</div>
		</li>
	{/each}
</ul>
<a
	role="button"
	href="/categories/new"
	class="
    btn btn-primary btn-circle fixed right-5 bottom-15.5 z-50 h-15 w-15
    shadow-lg sm:right-[calc(50%-19.75rem+1rem)] md:right-[calc(50%-22.75rem+1rem)] lg:right-[calc(50%-25.75rem+1rem)] xl:right-[calc(50%-29.75rem+1rem)]
"
	title="Add new category"
>
	<MdiPlus class="text-white" width={25} height={25} />
</a>
