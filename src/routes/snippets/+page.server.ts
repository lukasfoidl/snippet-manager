import { snippetsQuery } from '$lib/sql/snippetsQueries.server.js';
import { db } from '$lib/turso';
import { fail } from '@sveltejs/kit';
import { prepareCategories, prepareSnippets } from './server.js';
import { categoriesBaseQuery } from '$lib/sql/categoriesQueries.server.js';

export async function load({ locals }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: 'Unauthorized!' });
	}

	try {
		const result = await db.execute(snippetsQuery, [user.id]);
		const snippets = prepareSnippets(result);

		const result2 = await db.execute(categoriesBaseQuery, [user.id]);
		const categories = prepareCategories(result2);

		return { success: true, snippets: snippets, categories: categories };
	} catch {
		return fail(500, { error: 'Failed fetching snippets!' });
	}
}
