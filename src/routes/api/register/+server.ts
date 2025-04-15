import { passwordRegex, usernameRegex } from '$lib/utils/regex';
import { db } from '$lib/turso';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json();

	if (!usernameRegex.test(username)) {
		return new Response(JSON.stringify({ success: false, error: 'Invalid username!' }), {
			status: 400
		});
	}

	if (!passwordRegex.test(password)) {
		return new Response(JSON.stringify({ success: false, error: 'Invalid Password!' }), {
			status: 400
		});
	}

	try {
		// Check if username already exists
		const result = await db.execute('SELECT COUNT(*) FROM users WHERE username LIKE ?', [username]);

		if (result.rows && result.rows[0] && Number(result.rows[0][0]) > 0) {
			return new Response(JSON.stringify({ success: false, error: 'Username already exists!' }), {
				status: 400
			});
		}

		// Add user to the database
		await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error('Error:', err);
		return new Response(JSON.stringify({ success: false, error: 'Failed creating user!' }), {
			status: 500
		});
	}
};
