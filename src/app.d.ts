import 'unplugin-icons/types/svelte';
import type { Language } from '$lib/types';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				id: number;
				username: string;
			};
			lang: Language;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
