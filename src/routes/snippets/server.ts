import { categoriesLeanQuery } from '$lib/sql/categoriesQueries.server';
import { db } from '$lib/turso';
import type { Category, Snippet } from '$lib/types';
import type { ResultSet } from '@libsql/client';

export function prepareSnippets(result: ResultSet) {
	// Grouping rows into snippets with nested categories
	const snippetsMap = new Map<number, Snippet>();

	for (const row of result.rows) {
		if (!snippetsMap.has(Number(row.id))) {
			snippetsMap.set(Number(row.id), {
				id: Number(row.id),
				title: row.title as string,
				description: row.description as string,
				content: row.content as string,
				categories: []
			});
		}

		const snippet = snippetsMap.get(Number(row.id))!;

		if (row.category_id) {
			snippet.categories.push({
				id: Number(row.category_id),
				name: row.category_name as string,
				color: row.category_color as string,
				usage_count: undefined
			});
		}
	}

	const snippets: Snippet[] = Array.from(snippetsMap.values());

	return snippets;
}

export function prepareCategories(result: ResultSet) {
	const categories: Category[] = result.rows.map((row) => ({
		id: Number(row.id),
		name: row.name as string,
		color: row.color as string,
		usage_count: undefined
	}));

	return categories;
}

export async function validateCategories(
	userId: number,
	ids: number[]
): Promise<{ success: boolean; error: string }> {
	let dbIds: number[] = [];

	if (ids.length > 0) {
		try {
			dbIds = (await db.execute(categoriesLeanQuery, [userId])).rows.map((row) => {
				return row.id as number;
			});

			for (const id of ids) {
				if (!dbIds.includes(id)) {
					return { success: false, error: 'Invalid inputs!' };
				}
			}
		} catch {
			return { success: false, error: 'Failed to validate categories!' };
		}
	}

	return {
		success: true,
		error: ''
	};
}
