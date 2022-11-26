import type { LayoutLoad } from '.svelte-kit/types/src/routes/$types';

export const load: LayoutLoad = () => {
	return {
		menus: [
			{ slug: '/', title: 'Home' },
			{ slug: '/about', title: 'About' },
			{ slug: '/test/hello-world', title: 'Hello World' },
			{ slug: '/test/err', title: 'Error' }
		]
	};
};
