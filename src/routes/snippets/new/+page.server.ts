import { categoriesBaseQuery, categoriesLeanQuery } from '$lib/queries.server';
import { db } from '$lib/turso';
import type { Category } from '$lib/types';
import { validateSnippet } from '$lib/utils/validateSnippet';
import { fail } from '@sveltejs/kit';

export async function load({ locals }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: 'Unauthorized!' });
	}

	try {
		const result = await db.execute(categoriesBaseQuery, [user.id]);

		const categories: Category[] = result.rows.map((row) => ({
			id: Number(row.id),
			name: row.name as string,
			color: row.color as string,
			usage_count: Number(row.count)
		}));

		return { success: true, categories: categories };
	} catch {
		return fail(500, { error: 'Failed fetching categories!' });
	}
}

export const actions = {
	default: async ({ request, locals }) => {
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
				sql: `INSERT INTO snippets (user_id, title, description, content) VALUES (?, ?, ?, ?)`,
				args: [user.id, title, description, content]
			});

			const snippetId = Number(result.lastInsertRowid);

			for (const categoryId of categoryIds) {
				await tx.execute({
					sql: `INSERT INTO snippets_categories (snippet_id, category_id) VALUES (?, ?)`,
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

async function validateCategories(
	userId: number,
	ids: number[]
): Promise<{ success: boolean; error: string }> {
	let dbIds: number[] = [];

	if (ids.length > 0) {
		try {
			dbIds = (await db.execute(categoriesLeanQuery, [userId])).rows.map((row) => {
				return row.id as number;
			});

			for (const id of ids) {
				if (!dbIds.includes(id)) {
					return { success: false, error: 'Invalid inputs!' };
				}
			}
		} catch {
			return { success: false, error: 'Failed to validate categories!' };
		}
	}

	return {
		success: true,
		error: ''
	};
}
