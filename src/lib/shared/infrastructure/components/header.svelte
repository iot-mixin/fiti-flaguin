<script lang="ts">
	import { getContext } from 'svelte';
	import type { AuthStore } from '../stores/auth';
	import { authContextKey } from '../stores/auth';
	import TopAppBar, { Title, Section, Row } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';

	const authStore = getContext<AuthStore>(authContextKey);
</script>

<TopAppBar variant="static">
	<Row>
		<Section>
			<Title style="font-size: 2rem;">Welcome to Fiti Flaguin</Title>
		</Section>
		{#if $authStore.loggedIn}
			<Section align="end" toolbar>
				<IconButton on:click={() => authStore.logOut()} color="secondary" class="material-icons" size="button" alt="Logout Button">
					waving_hand
				</IconButton>
			</Section>
		{/if}
	</Row>
</TopAppBar>
