import { db } from '$lib/turso';
import { validateCategory } from '$lib/utils/validateCategory.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	save: async ({ request, locals }) => {
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
			// Add category to the database
			await db.execute('INSERT INTO categories (user_id, name, color) VALUES (?, ?, ?)', [
				user.id,
				name,
				hex
			]);

			return { success: true, message: 'Category created successfully!' };
		} catch {
			return fail(500, { error: 'Failed creating category!' });
		}
	}
};
