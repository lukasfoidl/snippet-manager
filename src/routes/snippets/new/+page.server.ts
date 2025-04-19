import { db } from '$lib/turso';
import { validateSnippet } from '$lib/utils/validateSnippet';
import { fail } from '@sveltejs/kit';
import { prepareCategories, validateCategories } from '../server.js';
import { categoriesBaseQuery } from '$lib/sql/categoriesQueries.server.js';
import {
	insertSnippetsCategoriesStatement,
	insertSnippetStatement
} from '$lib/sql/snippetsQueries.server.js';

export async function load({ locals }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: 'Unauthorized!' });
	}

	try {
		const result = await db.execute(categoriesBaseQuery, [user.id]);
		const categories = prepareCategories(result);

		return { success: true, categories: categories };
	} catch {
		return fail(500, { error: 'Failed fetching categories!' });
	}
}

export const actions = {
	save: async ({ request, locals }) => {
		const user = locals.user;

		if (!user || !user.id) {
			return fail(401, { error: 'Unauthorized!' });
		}

		const formData = await request.formData();

		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const content = formData.get('content') as string;
		const categoryIdsRaw = formData.get('categoryIds') as string | null;
		const categoryIds = categoryIdsRaw ? categoryIdsRaw.split(',').map(Number) : [];

		if (!validateSnippet(title, description, content).success) {
			return fail(400, { error: 'Invalid inputs!' });
		} else {
			const result = await validateCategories(user.id, categoryIds);
			if (!result.success) {
				return fail(400, { error: result.error });
			}
		}

		const tx = await db.transaction('write');

		try {
			const result = await tx.execute({
				sql: insertSnippetStatement,
				args: [user.id, title, description, content]
			});

			const snippetId = Number(result.lastInsertRowid);

			for (const categoryId of categoryIds) {
				await tx.execute({
					sql: insertSnippetsCategoriesStatement,
					args: [snippetId, categoryId]
				});
			}

			await tx.commit();
			return { success: true, message: 'Snippet created successfully!' };
		} catch {
			await tx.rollback();
			return fail(500, { error: 'Failed creating snippet!' });
		}
	}
};
