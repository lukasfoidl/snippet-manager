import { writable } from 'svelte/store';

let initialTheme = 'blueberry-light';

// Load correct theme for theme variable
if (typeof window !== 'undefined') {
	const saved = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	initialTheme = saved || (prefersDark ? 'blueberry-dark' : 'blueberry-light');
}

export const theme = writable(initialTheme);

// Update theme on change
theme.subscribe((value) => {
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', value);
		localStorage.setItem('theme', value);
	}
});
