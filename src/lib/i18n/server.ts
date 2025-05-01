import i18n from 'i18next';
import en from './en.json';
import de from './de.json';
import type { Language } from '$lib/types';

const translations = {
	en,
	de
};

export async function initServerI18n(lang: Language) {
	const trans = translations[lang] ?? translations.en;

	await i18n.init({
		lng: lang,
		fallbackLng: 'en',
		resources: {
			[lang]: {
				translation: trans
			}
		},
		interpolation: { escapeValue: false }
	});

	return i18n;
}
