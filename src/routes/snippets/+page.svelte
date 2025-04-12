<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from '$lib/types';
	import MdiCopy from 'virtual:icons/mdi/content-copy';
	import MdiPlus from 'virtual:icons/mdi/plus';

	let snippets: Snippet[] = [];

	onMount(async () => {
		const res = await fetch('/snippets.json');
		snippets = await res.json();
	});
</script>

<ul class="list bg-base-100 rounded-box shadow-md">
	{#if snippets.length > 0}
		{#each snippets as snippet (snippet.id)}
			<li class="list-row">
				<div class="col-span-2 inline-flex justify-between">
					<div>
						<div class="font-bold">{snippet.title}</div>
						<div class="text-xs font-semibold opacity-60">{snippet.description}</div>
					</div>
					<div>
						{#each snippet.categories as category (category.id)}
							<div class="badge badge-sm" style="background-color: {category.color}">
								{category.name}
							</div>
						{/each}
					</div>
				</div>
				<div class="list-col-wrap col-span-2 inline-flex items-center justify-between gap-1">
					<p class="line-clamp-3 text-xs">{snippet.content}</p>
					<div role="button" class="btn btn-ghost h-15 w-15 p-0" title="Copy to clipboard">
						<MdiCopy width={20} height={20} />
					</div>
				</div>
			</li>
		{/each}
	{:else}
		<li class="list-row">
			<div class="col-span-2 inline-flex justify-between">
				<div class="flex flex-col gap-1">
					<div class="skeleton bg-info h-3 w-30">&nbsp;</div>
					<div class="skeleton bg-info h-3 w-50">&nbsp;</div>
				</div>
				<div>
					<div class="badge badge-sm skeleton bg-info h-5 w-10">&nbsp;</div>
				</div>
			</div>
			<div class="list-col-wrap col-span-2 inline-flex items-center justify-between gap-1">
				<div class="flex w-full flex-col gap-1">
					<p class="skeleton bg-info h-3 w-full">&nbsp;</p>
					<p class="skeleton bg-info h-3 w-full">&nbsp;</p>
					<p class="skeleton bg-info h-3 w-60">&nbsp;</p>
				</div>
				<button disabled class="btn btn-ghost h-15 w-15 p-0" title="Copy to clipboard">
					<MdiCopy width={20} height={20} />
				</button>
			</div>
		</li>
	{/if}
</ul>
<a
	role="button"
	href="/snippets/new"
	class="
    btn btn-primary btn-circle fixed right-5 bottom-15.5 z-50 h-15 w-15
    shadow-lg sm:right-[calc(50%-19.75rem+1rem)] md:right-[calc(50%-22.75rem+1rem)] lg:right-[calc(50%-25.75rem+1rem)] xl:right-[calc(50%-29.75rem+1rem)]
"
	title="Add new snippet"
>
	<MdiPlus class="text-white" width={25} height={25} />
</a>
