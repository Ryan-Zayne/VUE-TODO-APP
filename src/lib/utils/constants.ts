export const isBrowser = typeof window !== 'undefined';

export const prefersDarkMode = isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches;
