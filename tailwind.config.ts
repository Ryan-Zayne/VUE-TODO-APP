import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const tailwindConfig = {
	content: ['./index.html', './src/**/*.{vue,ts}'],
	darkMode: ['class', '[data-theme="dark"]'],

	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '1000px',
			xl: '1280px',
		},

		backgroundImage: {
			'hero-light': `
						linear-gradient(225deg, hsl(217, 100%, 67%) 0%, hsl(280, 83%, 55%) 100%),
						url('/src/assets/hero-light.svg')
			`,

			'hero-light-desktop': `
						linear-gradient(225deg, hsl(217, 100%, 67%) 0%, hsl(280, 83%, 55%) 100%),
						url('/src/assets/hero-light-desktop.svg')
			`,

			'hero-dark': `
					linear-gradient(135deg, hsl(254, 85%, 40%) 0%, hsl(307, 64%, 39%) 100%),
					url('/src/assets/hero-dark.svg')
			`,

			'hero-dark-desktop': `
					linear-gradient(135deg, hsl(254, 85%, 40%) 0%, hsl(307, 64%, 39%) 100%),
					url('/src/assets/hero-dark-desktop.svg')
			`,
		},

		extend: {
			colors: {
				'main-theme': 'var(--main-theme)',
				primary: 'var(--text-primary)',
				secondary: 'var(--text-secondary)',
			},

			fontFamily: {
				josefin: ['Josefin Sans Variable', 'sans-serif'],
			},
		},
	},

	plugins: [
		plugin((pluginApi) => {
			const { addComponents } = pluginApi;

			const components = {
				'.custom-checkbox': {
					'input[type="checkbox"]&': {
						appearance: 'none',
						margin: '0',
					},

					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					aspectRatio: '1',
					borderRadius: '50%',
					backgroundImage: 'url("/src/assets/circle.svg")',
					backgroundSize: 'contain',

					'&:hover': {
						backgroundImage: 'url("/src/assets/circle-hover.svg")',
					},

					'&::before': {
						content: '""',
						backgroundImage: 'url("/src/assets/tick-icon.svg")',
						backgroundSize: 'contain',
						aspectRatio: '1',
						borderRadius: '50%',
						transform: 'scale(0)',
						transition: '150ms transform ease-in-out',
					},

					'&:checked::before': {
						transform: 'scale(1)',
					},
				},
			};

			addComponents(components);
		}),
	],
} satisfies Config;

export default tailwindConfig;
