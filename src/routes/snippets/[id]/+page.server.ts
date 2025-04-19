import {
	deleteSnippetsCategoriesStatement,
	deleteSnippetStatement,
	insertSnippetsCategoriesStatement,
	snippetQuery,
	updateSnippetStatement
} from '$lib/sql/snippetsQueries.server.js';
import { db } from '$lib/turso';
import { fail } from '@sveltejs/kit';
import { prepareCategories, prepareSnippets, validateCategories } from '../server.js';
import { validateSnippet } from '$lib/utils/validateSnippet.js';
import { categoriesBaseQuery } from '$lib/sql/categoriesQueries.server.js';

export async function load({ locals, params }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: 'Unauthorized!' });
	}

	try {
		const result = await db.execute(snippetQuery, [user.id, params.id]);
		const snippet = prepareSnippets(result)[0];

		const result2 = await db.execute(categoriesBaseQuery, [user.id]);
		const categories = prepareCategories(result2);

		return { success: true, snippet: snippet, categories: categories };
	} catch {
		return fail(500, { error: 'Failed fetching snippets!' });
	}
}

export const actions = {
	save: async ({ request, locals, params }) => {
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
				sql: updateSnippetStatement,
				args: [title, description, content, user.id, params.id]
			});

			if (result.rowsAffected !== 1) {
				throw new Error('Error updating snippet!');
			}

			await tx.execute({
				sql: deleteSnippetsCategoriesStatement,
				args: [params.id]
			});

			for (const categoryId of categoryIds) {
				await tx.execute({
					sql: insertSnippetsCategoriesStatement,
					args: [params.id, categoryId]
				});
			}

			await tx.commit();

			return { success: true, message: 'Snippet updated successfully!' };
		} catch {
			await tx.rollback();
			return fail(500, { error: 'Failed updating snippet!' });
		}
	},
	delete: async ({ locals, params }) => {
		const user = locals.user;

		if (!user || !user.id) {
			return fail(401, { error: 'Unauthorized!' });
		}

		const tx = await db.transaction('write');

		try {
			await tx.execute({
				sql: deleteSnippetsCategoriesStatement,
				args: [params.id]
			});

			const result = await tx.execute({ sql: deleteSnippetStatement, args: [user.id, params.id] });

			if (result.rowsAffected !== 1) {
				throw new Error('Error deleting snippet!');
			}

			await tx.commit();

			return { success: true, message: 'Snippet deleted successfully!' };
		} catch {
			await tx.rollback();
			return fail(500, { error: 'Failed deleting snippet!' });
		}
	}
};
