import { signJWT } from '$lib/auth.server.js';
import { db } from '$lib/turso';
import { validateUser } from '$lib/utils/validateUser.js';
import { fail, type Cookies } from '@sveltejs/kit';

export const actions = {
	register: async ({ request, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!validateUser(username, password).success) {
			return fail(400, { error: 'Invalid inputs!' });
		}

		try {
			// Check if username already exists
			const result = await db.execute('SELECT id FROM users WHERE username LIKE ?', [username]);

			if (result.rows && result.rows[0] && Number(result.rows[0][0]) > 0) {
				return fail(400, { error: 'Username already exists!' });
			}

			// Add user to the database
			await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [
				username,
				password
			]);

			const result2 = await db.execute('SELECT id FROM users WHERE username LIKE ?', [username]);

			const error = await authenticate(Number(result2.rows[0][0]), username, cookies);
			if (error instanceof Error) {
				return fail(500, { error: 'Failed to authenticate!' });
			}

			return { success: true, message: 'User created successfully!' };
		} catch {
			return fail(500, { error: 'Something went wrong!' });
		}
	},
	login: async ({ request, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!validateUser(username, password).success) {
			return fail(400, { error: 'Invalid inputs!' });
		}

		try {
			const result = await db.execute(
				'SELECT id FROM users WHERE username LIKE ? AND password LIKE ?',
				[username, password]
			);

			if (result.rows && result.rows.length !== 1) {
				return fail(400, { error: 'Invalid credentials!' });
			}

			const error = await authenticate(Number(result.rows[0][0]), username, cookies);
			if (error instanceof Error) {
				return fail(500, { error: 'Failed to authenticate!' });
			}

			return { success: true, message: 'Logged in successfully!' };
		} catch {
			return fail(500, { error: 'Something went wrong!' });
		}
	},
	logout: async ({ cookies }) => {
		cookies.delete('jwt', { path: '/' });

		return { success: true, message: 'Logged out successfully!' };
	}
};

async function authenticate(id: number, username: string, cookies: Cookies) {
	let token: string = '';
	try {
		token = await signJWT({ id: id, username: username });
	} catch (error) {
		return error;
	}

	cookies.set('jwt', token, {
		httpOnly: true,
		path: 'http://localhost:5173',
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});
}
