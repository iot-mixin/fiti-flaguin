<script lang="ts">
  import type { AuthStore } from "$lib/shared/infrastructure/stores/auth";
  import { authContextKey, authStore } from "$lib/shared/infrastructure/stores/auth";
  import Header from "$lib/shared/infrastructure/components/header.svelte";
  import Footer from "$lib/shared/infrastructure/components/footer.svelte";
  import type { LayoutData } from "./$types";
  import { setContext } from "svelte";

  setContext<AuthStore>(authContextKey, authStore);
  export let data: LayoutData;
</script>

<Header menus={data.menus} />
<main>
  <slot />
</main>
<Footer />

<style>
  :global(html) {
    font-size: 10px;
  }
  :global(body) {
    box-sizing: border-box;
    margin: 0;
    overflow: hidden;
  }
  :global(body),
  :global(#root) {
    width: 100vw;
    height: 100vh;
  }
  :global(#root) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px 1fr 100px;
  }
  main {
    font-size: 1.6rem;
    padding: 2rem;
  }
</style>
