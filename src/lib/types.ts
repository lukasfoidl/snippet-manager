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
