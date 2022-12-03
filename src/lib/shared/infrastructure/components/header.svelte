<script lang="ts">
  export let isLoggedIn: boolean = false;
</script>

<form action="/?/logout" method="post">
  <header>
    <nav class="border split-nav header_nav--container">
      <span class="header_nav--title"><a href="/">Welcome to Fiti Flaguin</a></span>
      {#if isLoggedIn}
        <div class="header_nav--collapsible">
          <div class="collapsible-body">
            <ul class="inline">
              <li><a class="header_nav" href="/profile">Profile</a></li>
            </ul>
          </div>
        </div>
        <button class="header_nav--logout" type="submit">Logout</button>
      {/if}
    </nav>
  </header>
</form>

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
