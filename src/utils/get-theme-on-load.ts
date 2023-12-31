import { prefersDarkMode } from './constants';

export const defaultSystemTheme = prefersDarkMode ? 'dark' : 'light';

export const getThemeOnLoad = (storageKey: string = 'theme') =>
	localStorage.getItem(storageKey) ?? defaultSystemTheme;
