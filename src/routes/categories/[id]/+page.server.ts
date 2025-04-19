import {
	categoryQuery,
	deleteCategoryStatement,
	deleteSnippetsCategoriesCategoryStatement,
	updateCategoryStatement
} from '$lib/queries.server';
import { db } from '$lib/turso';
import type { Category } from '$lib/types';
import { validateCategory } from '$lib/utils/validateCategory.js';
import { fail } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: 'Unauthorized!' });
	}

	try {
		const result = await db.execute(categoryQuery, [user.id, params.id]);

		const category: Category = result.rows.map((row) => ({
			id: Number(row.id),
			name: row.name as string,
			color: row.color as string,
			usage_count: undefined
		}))[0];

		return { success: true, category: category };
	} catch {
		return fail(500, { error: 'Failed fetching categories!' });
	}
}

export const actions = {
	save: async ({ request, locals, params }) => {
		const user = locals.user;

		if (!user || !user.id) {
			return fail(401, { error: 'Unauthorized!' });
		}

		const formData = await request.formData();

		const name = formData.get('name') as string;
		const hex = formData.get('hex') as string;

		if (!validateCategory(name, hex).success) {
			return fail(400, { error: 'Invalid inputs!' });
		}

		try {
			await db.execute(updateCategoryStatement, [name, hex, user.id, params.id]);

			return { success: true, message: 'Category updated successfully!' };
		} catch {
			return fail(500, { error: 'Failed updating category!' });
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
				sql: deleteSnippetsCategoriesCategoryStatement,
				args: [params.id]
			});
			await tx.execute({ sql: deleteCategoryStatement, args: [user.id, params.id] });

			await tx.commit();

			return { success: true, message: 'Category deleted successfully!' };
		} catch {
			await tx.rollback();
			return fail(500, { error: 'Failed deleting category!' });
		}
	}
};
