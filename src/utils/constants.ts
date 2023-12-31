export const isBrowser = typeof window !== 'undefined';

export const prefersDarkMode = isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const mobileQuery = window.matchMedia('(max-width: 767px)');

export const tabletQuery = window.matchMedia('(min-width: 768px)');

export const desktopQuery = window.matchMedia('(min-width: 1000px)');
