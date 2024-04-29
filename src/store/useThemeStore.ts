import { useState } from "@/composables/useState";
import { syncStateWithStorage } from "@/utils/syncStateWithStorage";
import { defineStore, storeToRefs } from "pinia";
import { computed } from "vue";

const themeStoreFn = defineStore("themeStore", () => {
	const [theme, setTheme] = useState(document.documentElement.dataset.theme);
	const isDarkMode = computed(() => theme.value === "dark");

	const toggleTheme = () => {
		const newTheme = theme.value === "light" ? "dark" : "light";

		document.documentElement.dataset.theme = newTheme;

		setTheme(newTheme);

		syncStateWithStorage("theme", newTheme);
	};

	return {
		theme,
		isDarkMode,

		actions: () => ({
			toggleTheme,
		}),
	};
});

export const useThemeStore = () => ({
	...storeToRefs(themeStoreFn()),
	actions: themeStoreFn().actions(),
});
