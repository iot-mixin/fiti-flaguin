<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { supabaseClient } from "$lib/db";
  import Header from "$lib/shared/infrastructure/components/header.svelte";
  import { initFlagContext } from "$lib/shared/infrastructure/featureFlags/context";
  import { onMount } from "svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
  initFlagContext(data.featureFlags);

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

{#await data.featureFlags?.isCustomTitleEnabled() then showWelcomeBack}
  <Header
    isLoggedIn={data.session !== null}
    logoutAction="/?/logout"
    userName={data.session?.user.user_metadata.name}
    {showWelcomeBack}
  />
{/await}
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
    padding: 4px 4px 0px 4px;
  }
  main {
    padding: 0px 2rem 0px 2rem;
    overflow: hidden;
  }
</style>
