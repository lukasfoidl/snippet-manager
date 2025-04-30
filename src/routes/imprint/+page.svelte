<script lang="ts">
	import ImprintBox from '$lib/components/imprintBox.svelte';
	import MdiInfo from 'virtual:icons/mdi/information-outline';
	import MdiAccount from 'virtual:icons/mdi/account';
	import MdiEmail from 'virtual:icons/mdi/email';
	import MdiSwap from 'virtual:icons/mdi/swap-horizontal';
	import MdiConflict from 'virtual:icons/mdi/fencing';
	import MdiGavel from 'virtual:icons/mdi/gavel';
	import { t } from '$lib/i18n/wrapper.js';
</script>

<ImprintBox title={$t('imprint.general.title')} text={$t('imprint.general.text')}>
	<MdiInfo class="h-5 w-5" />
</ImprintBox>
<ImprintBox title={$t('imprint.responsible.title')} text={$t('imprint.responsible.text')}>
	<MdiAccount class="h-5 w-5" />
</ImprintBox>
<ImprintBox title={$t('imprint.contact.title')} text={$t('imprint.contact.text')}>
	<MdiEmail class="h-5 w-5" />
</ImprintBox>
<ImprintBox title={$t('imprint.concern.title')} text={$t('imprint.concern.text')}>
	<MdiSwap class="h-5 w-5" />
</ImprintBox>
<ImprintBox title={$t('imprint.conflicts.title')} text={$t('imprint.conflicts.text')}>
	<MdiConflict class="h-5 w-5" />
</ImprintBox>
<ImprintBox title={$t('imprint.disclaimer.title')} text={$t('imprint.disclaimer.text')}>
	<MdiGavel class="h-5 w-5" />
</ImprintBox>
