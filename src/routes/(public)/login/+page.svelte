<script lang="ts">
	import type { AuthStore } from '$lib/shared/infrastructure/stores/auth';
	import { authContextKey } from '$lib/shared/infrastructure/stores/auth';
	import { getContext, onMount } from 'svelte';

	const authStore = getContext<AuthStore>(authContextKey);
	onMount(() => {});
</script>

<button on:click={() => authStore.logIn('Test')}>Log In</button>
