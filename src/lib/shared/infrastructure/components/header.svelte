<script lang="ts">
  export let isLoggedIn = false;
  export let logoutAction: string;
  export let userName: string;
  export let showWelcomeBack: boolean;
</script>

<header>
  <nav class="border split-nav header_nav--container">
    <div class="nav-brand">
      {#if !isLoggedIn || !showWelcomeBack}
        <h4><a href="/">Welcome to Fiti Flaguin</a></h4>
      {:else}
        <h4><a href="/">Welcome back {userName}</a></h4>
      {/if}
    </div>
    {#if isLoggedIn}
      <div class="header_nav--logout">
        <form action={logoutAction} method="post" style="display: inline;">
          <button type="submit">Logout</button>
        </form>
      </div>
    {/if}
  </nav>
</header>

<style>
  nav.split-nav {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .header_nav--container {
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-self: center;
    align-items: center;
  }
  .header_nav--logout {
    grid-column-start: col-start 3;
  }
</style>
