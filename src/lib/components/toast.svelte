<script lang="ts">
	import type { ToastType } from '$lib/types';
	import MdiClose from 'virtual:icons/mdi/close-octagon-outline';
	import MdiCheck from 'virtual:icons/mdi/check-circle-outline';
	import MdiInfo from 'virtual:icons/mdi/information-outline';

	export let message: string | null = null;
	export let type: ToastType = 'info';
</script>

{#if message}
	<div class="toast toast-top toast-end z-999">
		<div
			class={`alert gap-2 border-t-0 border-r-0 border-b-0 border-l-8 px-3 py-3 shadow-md ${type === 'success' ? 'border-success' : type === 'error' ? 'border-error' : 'border-info'}`}
		>
			{#if type == 'success'}
				<MdiInfo class="h-5 w-5" />
			{:else if type == 'error'}
				<MdiClose class="h-5 w-5" />
			{:else if type == 'info'}
				<MdiCheck class="h-5 w-5" />
			{/if}
			<div class="text-sm">{message}</div>
		</div>
	</div>
{/if}
