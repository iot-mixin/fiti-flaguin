<script lang="ts">
  import { goto, invalidate } from "$app/navigation";
  import { page } from "$app/stores";
  import { supabaseClient } from "$lib/db";
  import Footer from "$lib/shared/infrastructure/components/footer.svelte";
  import Header from "$lib/shared/infrastructure/components/header.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    const {
      data: { subscription }
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      debugger;
      console.log({ event, session });
      invalidate("supabase:auth");
      if (session) {
        goto("/", { invalidateAll: true });
      }
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
<Footer />

<style>
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
    grid-template-rows: auto 1fr 100px;
    padding: 4px 4px 2px 4px;
  }
  main {
    font-size: 1.6rem;
    padding: 2rem;
  }
</style>
