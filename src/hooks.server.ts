import { verifyJWT } from '$lib/auth.server';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const jwt = event.cookies.get('jwt');

	// Skip authentication for public routes
	if (
		event.url.pathname === '/' ||
		event.url.pathname === '/auth' ||
		event.url.pathname === '/imprint' ||
		event.url.pathname === '/faq'
	) {
		return resolve(event);
	}

	if (jwt) {
		try {
			const decoded: { id: string; username: string } = await verifyJWT(jwt);
			if (decoded && decoded.id && decoded.username) {
				event.locals.user = { id: Number(decoded.id), username: decoded.username }; // store the user in locals
			}
		} catch {
			event.locals.user = undefined;
			throw redirect(302, '/auth');
		}
	} else {
		// No JWT present, redirect to login
		event.locals.user = undefined;
		throw redirect(302, '/auth');
	}

	return resolve(event);
}
