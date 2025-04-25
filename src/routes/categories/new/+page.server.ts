import { t } from '$lib/i18n/wrapper.js';
import { insertCategoryStatement } from '$lib/sql/categoriesQueries.server.js';
import { db } from '$lib/turso';
import { validateCategory } from '$lib/utils/validateCategory.js';
import { fail } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const actions = {
	save: async ({ request, locals }) => {
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
			// Add category to the database
			await db.execute(insertCategoryStatement, [user.id, name, hex]);

			return { success: true, message: get(t)('categories.creation.success') };
		} catch {
			return fail(500, { error: get(t)('categories.creation.error') });
		}
	}
};
