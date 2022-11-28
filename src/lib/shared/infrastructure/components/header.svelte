<script lang="ts">
  import { getContext } from "svelte";
  import type { AuthStore } from "../stores/auth";
  import { authContextKey } from "../stores/auth";

  const authStore = getContext<AuthStore>(authContextKey);
</script>

<header>
  <nav class="border split-nav header_nav--container">
    <div class="header_nav--title">Welcome to Fiti Flaguin</div>
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
