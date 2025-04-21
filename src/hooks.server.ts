import { verifyJWT } from '$lib/auth.server';
import { initServerI18n } from '$lib/i18n/server';
import { languages, type Language } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	// LANGUAGE
	let lang = event.cookies.get('lang') as Language | undefined;

	if (!lang) {
		const browserLang = detectBrowserLanguage(event.request.headers.get('accept-language'));
		lang = browserLang ?? 'en';

		event.cookies.set('lang', lang, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true
		});
	}

	await initServerI18n(lang); // Initialize i18n for server rendering and error messages
	event.locals.lang = lang as Language; // Make lang accessible to load functions and endpoints

	// AUTHENTICATION
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

function detectBrowserLanguage(header: string | null): Language | undefined {
	if (!header) return undefined;

	const langs = header.split(',').map((part) => part.split(';')[0].trim());
    
	for (const lang of langs) {
		const short = lang.slice(0, 2) as Language; // e.g., 'de-DE' → 'de'
		if (languages.some((lang) => lang.code === short)) {
			return short;
		}
	}

	return undefined;
}
