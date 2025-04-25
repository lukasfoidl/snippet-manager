export type Snippet = {
	id: number;
	title: string;
	description: string;
	content: string;
	categories: Array<Category>;
};

export type Category = {
	id: number;
	name: string;
	color: string;
	usage_count: number | undefined;
};

export type ToastType = 'success' | 'error' | 'info';

export type Language = 'en' | 'de';
export const languages: { code: Language; translation: string }[] = [
	{ code: 'en', translation: 'languages.en' },
	{ code: 'de', translation: 'languages.de' }
];
