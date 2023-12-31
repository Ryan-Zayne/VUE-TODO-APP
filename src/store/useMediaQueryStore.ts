import { useState } from '@/composables/useState';
import { desktopQuery, mobileQuery, tabletQuery } from '@/utils/constants';
import { defineStore, storeToRefs } from 'pinia';

const mediaQueryStoreFn = defineStore('mediaQueryStore', () => {
	const [isMobile, setIsMobile] = useState(mobileQuery.matches);
	const [isTablet, setIsTablet] = useState(tabletQuery.matches);
	const [isDesktop, setIsDesktop] = useState(desktopQuery.matches);

	mobileQuery.addEventListener('change', () => setIsMobile(mobileQuery.matches));
	tabletQuery.addEventListener('change', () => setIsTablet(tabletQuery.matches));
	desktopQuery.addEventListener('change', () => setIsDesktop(desktopQuery.matches));

	return { isMobile, isTablet, isDesktop };
});

export const useMediaQueryStore = () => storeToRefs(mediaQueryStoreFn());
