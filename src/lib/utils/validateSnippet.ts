import { get } from 'svelte/store';
import { contentRegex, descriptionRegex, titleRegex } from './regex';
import { t } from '$lib/i18n/wrapper';

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
		errors.title = get(t)('snippets.validation.title.required');
	} else if (!titleRegex.test(title)) {
		errors.title = get(t)('snippets.validation.title.format');
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}

export function validateDescription(description: string): SnippetValidationResult {
	const errors: SnippetValidationResult['errors'] = {};

	if (!descriptionRegex.test(description)) {
		errors.description = get(t)('snippets.validation.description.format');
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}

export function validateContent(content: string): SnippetValidationResult {
	const errors: SnippetValidationResult['errors'] = {};

	if (!content.trim()) {
		errors.content = get(t)('snippets.validation.content.required');
	} else if (!contentRegex.test(content)) {
		errors.content = get(t)('snippets.validation.content.format');
	}

	return {
		success: Object.keys(errors).length === 0,
		errors
	};
}
