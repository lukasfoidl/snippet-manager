import { categoriesBaseQuery, snippetsQuery } from '$lib/queries.server.js';
import { db } from '$lib/turso';
import type { Category, Snippet } from '$lib/types';
import { fail } from '@sveltejs/kit';

export async function load({ locals }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: 'Unauthorized!' });
	}

	try {
		const result = await db.execute(snippetsQuery, [user.id]);

		// Grouping rows into snippets with nested categories
		const snippetsMap = new Map<number, Snippet>();

		for (const row of result.rows) {
			if (!snippetsMap.has(Number(row.id))) {
				snippetsMap.set(Number(row.id), {
					id: Number(row.id),
					title: row.title as string,
					description: row.description as string,
					content: row.content as string,
					categories: []
				});
			}

			const snippet = snippetsMap.get(Number(row.id))!;

			if (row.category_id) {
				snippet.categories.push({
					id: Number(row.category_id),
					name: row.category_name as string,
					color: row.category_color as string,
					usage_count: undefined
				});
			}
		}

		const snippets: Snippet[] = Array.from(snippetsMap.values());

		const result2 = await db.execute(categoriesBaseQuery, [user.id]);

		const categories: Category[] = result2.rows.map((row) => ({
			id: Number(row.id),
			name: row.name as string,
			color: row.color as string,
			usage_count: undefined
		}));

		return { success: true, snippets: snippets, categories: categories };
	} catch {
		return fail(500, { error: 'Failed fetching snippets!' });
	}
}
