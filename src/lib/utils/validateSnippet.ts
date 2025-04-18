import { contentRegex, descriptionRegex, titleRegex } from './regex';

export type SnippetValidationResult = {
	success: boolean;
	errors: {
		title?: string;
		description?: string;
		content?: string;
	};
};

export function validateSnippet(
	title: string,
	description: string,
	content: string
): SnippetValidationResult {
	const titleValidation = validateTitle(title);
	const descriptionValidation = validateDescription(description);
	const contentValidation = validateContent(content);

	return {
		success: titleValidation.success && descriptionValidation.success && contentValidation.success,
		errors: {
			...titleValidation.errors,
			...descriptionValidation.errors,
			...contentValidation.errors
		}
	};
}

export function validateTitle(title: string): SnippetValidationResult {
	const errors: SnippetValidationResult['errors'] = {};

	if (!title.trim()) {
		errors.title = 'Title is required!';
	} else if (!titleRegex.test(title)) {
		errors.title = 'Invalid title format!';
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}

export function validateDescription(description: string): SnippetValidationResult {
	const errors: SnippetValidationResult['errors'] = {};

	if (!descriptionRegex.test(description)) {
		errors.description = 'Invalid description format!';
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}

export function validateContent(content: string): SnippetValidationResult {
	const errors: SnippetValidationResult['errors'] = {};

	if (!content.trim()) {
		errors.content = 'Content is required!';
	} else if (!contentRegex.test(content)) {
		errors.content = 'Invalid content format!';
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}
