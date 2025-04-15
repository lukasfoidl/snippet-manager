import type { ToastType } from '$lib/types';
import { writable } from 'svelte/store';

export const toastMessage = writable<string | null>(null);
export const toastType = writable<ToastType>('info');

let toastTimeout: ReturnType<typeof setTimeout> | null = null;

export const showToast = (message: string, type: ToastType, duration = 2500) => {
	toastMessage.set(message);
	toastType.set(type);

	if (toastTimeout) {
		clearTimeout(toastTimeout);
	}

	toastTimeout = setTimeout(() => {
		toastMessage.set(null);
	}, duration);
};
