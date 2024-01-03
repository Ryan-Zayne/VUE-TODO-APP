import type { Config } from "tailwindcss";

const tailwindConfig = {
	content: ["./index.html", "./src/**/*.{vue,ts}"],
	darkMode: ["class", '[data-theme="dark"]'],

	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "1000px",
			xl: "1280px",
		},

		backgroundImage: {
			"hero-light": `
						linear-gradient(225deg, hsl(217, 100%, 67%) 0%, hsl(280, 83%, 55%) 100%),
						url('/src/assets/hero-light.svg')
			`,

			"hero-light-desktop": `
						linear-gradient(225deg, hsl(217, 100%, 67%) 0%, hsl(280, 83%, 55%) 100%),
						url('/src/assets/hero-light-desktop.svg')
			`,

			"hero-dark": `
					linear-gradient(135deg, hsl(254, 85%, 40%) 0%, hsl(307, 64%, 39%) 100%),
					url('/src/assets/hero-dark.svg')
			`,

			"hero-dark-desktop": `
					linear-gradient(135deg, hsl(254, 85%, 40%) 0%, hsl(307, 64%, 39%) 100%),
					url('/src/assets/hero-dark-desktop.svg')
			`,
		},

		extend: {
			colors: {
				"main-theme": "var(--main-theme)",
				primary: "var(--text-primary)",
				secondary: "var(--text-secondary)",
			},

			fontFamily: {
				josefin: ["Josefin Sans Variable", "sans-serif"],
			},
		},
	},
} satisfies Config;

export default tailwindConfig;
