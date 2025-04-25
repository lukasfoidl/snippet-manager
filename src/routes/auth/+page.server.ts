import { signJWT } from '$lib/auth.server.js';
import {
	baseUserQuery,
	insertUserStatement,
	secureUserQuery
} from '$lib/sql/authQueries.server.js';
import { db } from '$lib/turso';
import { validateUser } from '$lib/utils/validateUser.js';
import { fail, type Cookies } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { t } from '$lib/i18n/wrapper';
import type { Language } from '$lib/types.js';

export const actions = {
	register: async ({ request, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!validateUser(username, password).success) {
			return fail(400, { error: get(t)('auth.validation.user') });
		}

		const tx = await db.transaction('write');

		try {
			// Check if username already exists
			const result = await tx.execute({
				sql: baseUserQuery,
				args: [username]
			});

			if (result.rows && result.rows[0] && Number(result.rows[0][0]) > 0) {
				return fail(400, { error: get(t)('auth.validation.username.duplicate') });
			}

			// Add user to the database
			const result2 = await tx.execute({
				sql: insertUserStatement,
				args: [username, password]
			});

			await tx.commit();

			const error = await authenticate(Number(result2.lastInsertRowid), username, cookies);
			if (error instanceof Error) {
				return fail(500, { error: get(t)('auth.authenticationError') });
			}

			return { success: true, message: get(t)('auth.registration.success') };
		} catch {
			await tx.rollback();
			return fail(500, { error: get(t)('auth.registration.error') });
		}
	},
	login: async ({ request, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!validateUser(username, password).success) {
			return fail(400, { error: get(t)('auth.validation.user') });
		}

		try {
			const result = await db.execute(secureUserQuery, [username, password]);

			if (result.rows && result.rows.length !== 1) {
				return fail(400, { error: get(t)('auth.login.error') });
			}

			const error = await authenticate(Number(result.rows[0][0]), username, cookies);
			if (error instanceof Error) {
				return fail(500, { error: get(t)('auth.authenticationError') });
			}

			return { success: true, message: get(t)('auth.login.success') };
		} catch {
			return fail(500, { error: get(t)('auth.fetchingError') });
		}
	},
	logout: async ({ cookies }) => {
		cookies.delete('jwt', { path: '/' });

		return { success: true, message: get(t)('auth.logout.success') };
	},
	lang: async ({ request, cookies }) => {
		const formData = await request.formData();

		const lang = (formData.get('lang')?.toString() as Language) ?? 'en';

		cookies.set('lang', lang, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true
		});

		return { success: true, lang: lang };
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
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});
}
