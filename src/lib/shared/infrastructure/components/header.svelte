<script lang="ts">
  import { getContext } from "svelte";
  import type { AuthStore } from "../stores/auth";
  import { authContextKey } from "../stores/auth";

  const authStore = getContext<AuthStore>(authContextKey);
</script>

<header>
  <nav class="border split-nav header_nav--container">
    <span class="header_nav--title">Welcome to Fiti Flaguin</span>
    {#if $authStore.loggedIn}
      <button class="header_nav--logout" on:click|preventDefault={() => authStore.logOut()}>Bye {$authStore.token}</button>
    {/if}
  </nav>
</header>

<style>
  header,
  nav {
    height: 55px;
  }
  nav.split-nav {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .header_nav--title {
    font-size: 2rem;
    border-bottom-color: var(--primary);
    background-image: none;
    border-bottom-left-radius: 15px 3px;
    border-bottom-right-radius: 15px 5px;
    border-bottom-style: solid;
    border-bottom-width: 5px;
    padding-bottom: 0.1rem;
  }
  .header_nav--container {
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-self: center;
    align-items: center;
  }
  .header_nav--logout {
    grid-column-start: col-start 3;
    font-size: 1.2rem;
  }
</style>
