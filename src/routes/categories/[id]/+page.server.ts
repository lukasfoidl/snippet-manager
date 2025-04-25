import { t } from '$lib/i18n/wrapper.js';
import {
	categoryQuery,
	deleteCategoryStatement,
	deleteSnippetsCategoriesStatement,
	updateCategoryStatement
} from '$lib/sql/categoriesQueries.server';
import { db } from '$lib/turso';
import type { Category } from '$lib/types';
import { validateCategory } from '$lib/utils/validateCategory.js';
import { fail } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ locals, params }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: get(t)('auth.unauthorized') });
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
		return fail(500, { error: get(t)('categories.fetchingError') });
	}
}

export const actions = {
	save: async ({ request, locals, params }) => {
		const user = locals.user;

		if (!user || !user.id) {
			return fail(401, { error: get(t)('auth.unauthorized') });
		}

		const formData = await request.formData();

		const name = formData.get('name') as string;
		const hex = formData.get('hex') as string;

		if (!validateCategory(name, hex).success) {
			return fail(400, { error: get(t)('categories.validation.category') });
		}

		try {
			const result = await db.execute(updateCategoryStatement, [name, hex, user.id, params.id]);

			if (result.rowsAffected !== 1) {
				throw new Error('Error updating category!');
			}

			return { success: true, message: get(t)('categories.update.success') };
		} catch {
			return fail(500, { error: get(t)('categories.update.error') });
		}
	},
	delete: async ({ locals, params }) => {
		const user = locals.user;

		if (!user || !user.id) {
			return fail(401, { error: get(t)('auth.unauthorized') });
		}

		const tx = await db.transaction('write');

		try {
			await tx.execute({
				sql: deleteSnippetsCategoriesStatement,
				args: [params.id]
			});

			const result = await tx.execute({ sql: deleteCategoryStatement, args: [user.id, params.id] });

			if (result.rowsAffected !== 1) {
				throw new Error('Error deleting category!');
			}

			await tx.commit();

			return { success: true, message: get(t)('categories.deletion.success') };
		} catch {
			await tx.rollback();
			return fail(500, { error: get(t)('categories.deletion.error') });
		}
	}
};
