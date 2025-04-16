import { usernameRegex, passwordRegex } from './regex';

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
		errors.username = 'Username is required!';
	} else if (!usernameRegex.test(username)) {
		errors.username = 'Invalid username format!';
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}

export function validatePassword(password: string): UserValidationResult {
	const errors: UserValidationResult['errors'] = {};

	if (!password.trim()) {
		errors.password = 'Password is required!';
	} else if (!passwordRegex.test(password)) {
		errors.password = 'Password must be at least 8 characters!';
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}
