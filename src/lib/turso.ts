import { createClient } from '@libsql/client';
import { DATABASE_URL, DATABASE_TOKEN } from '$env/static/private';

export const db = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_TOKEN
});
