import { get } from 'svelte/store';
import { usernameRegex, passwordRegex } from './regex';
import { t } from '$lib/i18n/wrapper';

export type UserValidationResult = {
	success: boolean;
	errors: {
		username?: string;
		password?: string;
	};
};

export function validateUser(username: string, password: string): UserValidationResult {
	const usernameValidation = validateUsername(username);
	const passwordValidation = validatePassword(password);

	return {
		success: usernameValidation.success && passwordValidation.success,
		errors: {
			...usernameValidation.errors,
			...passwordValidation.errors
		}
	};
}

export function validateUsername(username: string): UserValidationResult {
	const errors: UserValidationResult['errors'] = {};

	if (!username.trim()) {
		errors.username = get(t)('auth.validation.username.required');
	} else if (!usernameRegex.test(username)) {
		errors.username = get(t)('auth.validation.username.format');
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}

export function validatePassword(password: string): UserValidationResult {
	const errors: UserValidationResult['errors'] = {};

	if (!password.trim()) {
		errors.password = get(t)('auth.validation.password.required');
	} else if (!passwordRegex.test(password)) {
		errors.password = get(t)('auth.validation.password.format');
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}
