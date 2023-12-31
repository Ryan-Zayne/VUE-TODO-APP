<script lang="ts" setup>
import { useThemeActions, useThemeStore } from '@/store/useThemeStore';

const { isDarkMode } = useThemeStore();
const { toggleTheme } = useThemeActions();
</script>

<template>
	<header
		class="min-h-[20rem] w-full bg-hero-light bg-cover bg-no-repeat px-[2.4rem] pt-[4.8rem] font-bold bg-blend-overlay md:min-h-[30rem] md:bg-hero-light-desktop md:pt-[7rem] dark:bg-hero-dark md:dark:bg-hero-dark-desktop"
	>
		<div class="mx-auto flex w-[min(100%,_clamp(32.7rem,_80vw,_54rem))] items-start justify-between">
			<img
				src="/src/assets/logo.svg"
				class="h-[2rem] w-[10.9rem] md:h-[4rem] md:w-[16.7rem]"
				alt=""
			/>

			<button @click="toggleTheme">
				<img
					:src="`../assets/${isDarkMode ? 'sun' : 'moon'}.svg`"
					class="aspect-square w-[2rem] md:w-[2.6rem]"
					fetchpriority="high"
					alt=""
				/>
			</button>
		</div>
	</header>
</template>
