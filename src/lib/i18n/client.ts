import { initI18n } from './wrapper';
import en from './en.json';
import de from './de.json';

export const i18n = await initI18n({
	lng: 'en',
	fallbackLng: 'en',
	resources: {
		en: { translation: en },
		de: { translation: de }
	},
	interpolation: { escapeValue: false }
});
