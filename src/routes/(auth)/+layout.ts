import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { authStore } from '$lib/shared/infrastructure/stores/auth';
import { get } from 'svelte/store';
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = () => {
	if (browser) {
		if (get(authStore).loggedIn) {
			return {
				shouldLoad: true
			};
		}
		goto('/login');
	}
	return {
		shouldLoad: false
	};
};
