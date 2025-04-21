import i18n from 'i18next';
import { readFile } from 'fs/promises';
import path from 'path';

export async function initServerI18n(lang: string) {
	const filePath = path.resolve('src/lib/i18n', `${lang}.json`);
	const content = await readFile(filePath, 'utf-8');
	const json = JSON.parse(content);

	await i18n.init({
		lng: lang,
		fallbackLng: 'en',
		resources: {
			[lang]: {
				translation: json
			}
		},
		interpolation: { escapeValue: false }
	});

	return i18n;
}
