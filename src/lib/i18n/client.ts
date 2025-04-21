import { initI18n } from './wrapper';
import en from '$lib/i18n/en.json';
import de from '$lib/i18n/de.json';

export const i18n = await initI18n({
	lng: 'en',
	fallbackLng: 'en',
	resources: {
		en: { translation: en },
		de: { translation: de }
	},
	interpolation: { escapeValue: false }
});
