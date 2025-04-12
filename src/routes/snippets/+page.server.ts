import snippets from '$lib/snippets.json';
import categories from '$lib/categories.json';

export async function load() {
	return {
		snippets,
		categories
	};
}
