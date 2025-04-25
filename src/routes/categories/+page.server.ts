import { t } from '$lib/i18n/wrapper.js';
import { categoriesExtendedQuery } from '$lib/sql/categoriesQueries.server';
import { db } from '$lib/turso';
import type { Category } from '$lib/types.js';
import { fail } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ locals }) {
	const user = locals.user;

	if (!user || !user.id) {
		return fail(401, { error: get(t)('auth.unauthorized') });
	}

	try {
		const result = await db.execute(categoriesExtendedQuery, [user.id]);

		const categories: Category[] = result.rows.map((row) => ({
			id: Number(row.id),
			name: row.name as string,
			color: row.color as string,
			usage_count: Number(row.count)
		}));

		return { success: true, categories: categories };
	} catch {
		return fail(500, { error: get(t)('categories.fetchingError') });
	}
}
