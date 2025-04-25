import { snippetsQuery } from '$lib/sql/snippetsQueries.server.js';
import { db } from '$lib/turso';
import { fail } from '@sveltejs/kit';
import { prepareCategories, prepareSnippets } from './server.js';
import { categoriesBaseQuery } from '$lib/sql/categoriesQueries.server.js';
import { get } from 'svelte/store';
import { t } from '$lib/i18n/wrapper.js';

export async function load({ locals }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: get(t)('auth.unauthorized') });
	}

	try {
		const result = await db.execute(snippetsQuery, [user.id]);
		const snippets = prepareSnippets(result);

		const result2 = await db.execute(categoriesBaseQuery, [user.id]);
		const categories = prepareCategories(result2);

		return { success: true, snippets: snippets, categories: categories };
	} catch {
		return fail(500, { error: get(t)('snippets.fetchingError') });
	}
}
