import { db } from '$lib/turso';
import { validateUser } from '$lib/utils/validateUser.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	register: async ({ request }) => {
		const formData = await request.formData();

		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!validateUser(username, password).success) {
			return fail(400, { error: 'Invalid inputs!' });
		}

		try {
			// Check if username already exists
			const result = await db.execute('SELECT COUNT(*) FROM users WHERE username LIKE ?', [
				username
			]);

			if (result.rows && result.rows[0] && Number(result.rows[0][0]) > 0) {
				return fail(400, { error: 'Username already exists!' });
			}

			// Add user to the database
			await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [
				username,
				password
			]);

			return { success: true, message: 'User created successfully!' };
		} catch {
			return fail(500, { error: 'Something went wrong!' });
		}
	},
	login: async ({ request }) => {
		const formData = await request.formData();

		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!validateUser(username, password).success) {
			return fail(400, { error: 'Invalid inputs!' });
		}

		try {
			const result = await db.execute(
				'SELECT COUNT(*) FROM users WHERE username LIKE ? AND password LIKE ?',
				[username, password]
			);

			if (result.rows && result.rows[0] && Number(result.rows[0][0]) !== 1) {
				return fail(400, { error: 'Invalid credentials!' });
			}

			return { success: true, message: 'Logged in successfully!' };
		} catch {
			return fail(500, { error: 'Something went wrong!' });
		}
	}
};
