<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { AuthStore } from '../stores/auth';
	import { authContextKey } from '../stores/auth';

	export let menus: { slug: string; title: string }[];
	const authStore = getContext<AuthStore>(authContextKey);
	onMount(() => {});
</script>

<header>
	<div>Welcome to Fiti Flaguin</div>
	{#if $authStore.loggedIn}
		<nav>
			{#each menus as menu (menu.slug)}
				<a href={menu.slug}>{menu.title}</a>
			{/each}
		</nav>
		<button on:click={() => authStore.logOut()}> Bye {$authStore.token} </button>
	{/if}
</header>

<style>
	header {
		font-size: 1.6rem;
		padding: 2rem;
	}
	nav,
	div {
		text-align: center;
	}
	nav > a {
		padding: 5px;
	}
</style>
