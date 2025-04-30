<script lang="ts">
	const { children } = $$props;
	export let title: string;
	export let text: string;
</script>

<fieldset class="fieldset border-base-300 rounded-box mb-3 flex w-full flex-row border p-3">
	<legend class="fieldset-legend">
		<div class="mx-1 flex flex-row items-center gap-1">
			<slot>{children}</slot>
			<div class="textarea-md">{title}</div>
		</div></legend
	>
	<p class="text-sm">{@html text}</p>
</fieldset>
