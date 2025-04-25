import { get } from 'svelte/store';
import { colorRegex, nameRegex } from './regex';
import { t } from '$lib/i18n/wrapper';

export type CategoryValidationResult = {
	success: boolean;
	errors: {
		name?: string;
		hex?: string;
	};
};

export function validateCategory(name: string, hex: string): CategoryValidationResult {
	const usernameValidation = validateName(name);
	const passwordValidation = validateColor(hex);

	return {
		success: usernameValidation.success && passwordValidation.success,
		errors: {
			...usernameValidation.errors,
			...passwordValidation.errors
		}
	};
}

export function validateName(name: string): CategoryValidationResult {
	const errors: CategoryValidationResult['errors'] = {};

	if (!name.trim()) {
		errors.name = get(t)('categories.validation.name.required');
	} else if (!nameRegex.test(name)) {
		errors.name = get(t)('categories.validation.name.format');
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}

export function validateColor(hex: string): CategoryValidationResult {
	const errors: CategoryValidationResult['errors'] = {};

	if (!hex.trim()) {
		errors.hex = get(t)('categories.validation.color.required');
	} else if (!colorRegex.test(hex)) {
		errors.hex = get(t)('categories.validation.color.format');
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}
