import { showToast } from '$lib/stores/useToast';

export const apiCall = async <T>(
	url: string,
	method: string,
	body: string,
	successMsg?: string,
	errorMsg?: string
): Promise<T | null> => {
	try {
		const res = await fetch(url, {
			method: method,
			headers: { 'Content-Type': 'application/json' },
			body: body
		});

		const result = await res.json();

		if (!res.ok || !result.success) {
			showToast(result.error || errorMsg || 'Something went wrong!', 'error');
			return null;
		}

		if (successMsg) {
			showToast(successMsg, 'success');
		}

		return result;
	} catch {
		showToast(errorMsg || 'Unexpected error occurred!', 'error');
		return null;
	}
};
