import { writable } from 'svelte/store';

export const modal = writable<{
	action: string | null;
	text: string | null;
	description: string | null;
	goto: string | null;
}>({ action: null, text: null, description: null, goto: null });

export function showModal(
	modalId: string,
	text: string,
	description: string,
	action: string,
	goto: string
) {
	modal.set({ action: action, text: text, description: description, goto: goto });
	(document.getElementById(modalId) as HTMLDialogElement).showModal();
}

export function closeModal(modalId: string) {
	(document.getElementById(modalId) as HTMLDialogElement).close();
}
