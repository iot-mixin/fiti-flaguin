<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { page } from "$app/stores";
  import { supabaseClient } from "$lib/db";
  import Header from "$lib/shared/infrastructure/components/header.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    const {
      data: { subscription }
    } = supabaseClient.auth.onAuthStateChange(() => {
      invalidate("supabase:auth");
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<Header isLoggedIn={$page.data.session !== null} />
<main>
  <slot />
</main>

<style>
  :global(body) {
    background: url("/background.jpg");
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
    grid-template-rows: auto 1fr;
    padding: 4px 4px 2px 4px;
  }
  main {
    padding: 2rem;
    overflow: hidden;
  }
</style>
