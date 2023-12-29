import { prefersDarkMode } from './constants';
import { parseJSON } from './parseJson';

type ThemeState = {
	state: { theme: 'dark' | 'light' };
};

const defaultSystemPreference: ThemeState = {
	state: { theme: prefersDarkMode ? 'dark' : 'light' },
};

const getInitialThemeOnLoad = () => {
	const themeStateInStorage = parseJSON<ThemeState>(localStorage.getItem('colorScheme'));

	return (themeStateInStorage ?? defaultSystemPreference).state.theme;
};

export { getInitialThemeOnLoad };
