<script lang="ts">
	import { t } from '$lib/i18n/wrapper';
	import MdiDatabaseOff from 'virtual:icons/mdi/database-off';
</script>

<div class="flex h-full flex-col items-center justify-center gap-2">
	<MdiDatabaseOff class="text-primary h-20 w-20" />
	<div class="text-primary">{$t('noDataFound')}</div>
</div>
