import i18n, { type InitOptions } from 'i18next';
import { writable } from 'svelte/store';

export const t = writable((key: string) => key);
export const initialized = writable(false);

export async function initI18n(config: InitOptions) {
	await i18n.init(config ?? {});

	t.set(i18n.t.bind(i18n));
	initialized.set(true);

	i18n.on('languageChanged', () => {
		t.set(i18n.t.bind(i18n));
	});

	return i18n;
}

export default i18n;
