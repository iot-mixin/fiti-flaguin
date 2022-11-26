import { goto } from '$app/navigation';
import type { Readable } from 'svelte/store';
import { writable } from 'svelte/store';

export const authContextKey = Symbol();

interface AuthData {
	token: string;
	loggedIn: boolean;
}

export interface AuthStore extends Readable<AuthData> {
	logIn: (token: string) => void;
	logOut: () => void;
}

function createAuth(): AuthStore {
	const { subscribe, set } = writable<AuthData>({
		token: '',
		loggedIn: false
	});

	return {
		subscribe,
		logIn: (token: string) => {
			set({ token, loggedIn: true });
			goto('/');
		},
		logOut: () => {
			set({ token: '', loggedIn: false });
			goto('/login');
		}
	};
}

export const authStore = createAuth();
