import { signJWT } from '$lib/auth.server.js';
import {
	baseUserQuery,
	insertUserStatement,
	secureUserQuery
} from '$lib/sql/authQueries.server.js';
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

		const tx = await db.transaction('write');

		try {
			// Check if username already exists
			const result = await tx.execute({
				sql: baseUserQuery,
				args: [username]
			});

			if (result.rows && result.rows[0] && Number(result.rows[0][0]) > 0) {
				return fail(400, { error: 'Username already exists!' });
			}

			// Add user to the database
			const result2 = await tx.execute({
				sql: insertUserStatement,
				args: [username, password]
			});

			await tx.commit();

			const error = await authenticate(Number(result2.lastInsertRowid), username, cookies);
			if (error instanceof Error) {
				return fail(500, { error: 'Failed to authenticate!' });
			}

			return { success: true, message: 'User created successfully!' };
		} catch {
			await tx.rollback();
			return fail(500, { error: 'Failed creating user!' });
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
			const result = await db.execute(secureUserQuery, [username, password]);

			if (result.rows && result.rows.length !== 1) {
				return fail(400, { error: 'Invalid credentials!' });
			}

			const error = await authenticate(Number(result.rows[0][0]), username, cookies);
			if (error instanceof Error) {
				return fail(500, { error: 'Failed to authenticate!' });
			}

			return { success: true, message: 'Logged in successfully!' };
		} catch {
			return fail(500, { error: 'Failed fetching user!' });
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
