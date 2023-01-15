<script lang="ts" context="module">
  import { browser } from "$app/environment";
  import type FeatureFlags from "$lib/shared/domain/featureFlags";
  import PostHogClientFactory from "$lib/shared/infrastructure/featureFlags/postHogClientFactory";
  import PostHogFeatureFlags from "$lib/shared/infrastructure/featureFlags/posthogFeatureFlags";

  let featureFlags: FeatureFlags;
  if (browser) {
    featureFlags = new PostHogFeatureFlags(PostHogClientFactory.createClient());
  }
</script>

<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { page } from "$app/stores";
  import { supabaseClient } from "$lib/db";
  import Header from "$lib/shared/infrastructure/components/header.svelte";
  import { onMount, setContext } from "svelte";
  import { FeatureFlagsKey } from "$lib/shared/domain/featureFlags";

  setContext<{ featureFlags: FeatureFlags }>(FeatureFlagsKey, {
    featureFlags
  });

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

<Header isLoggedIn={$page.data.session !== null} logoutAction="/?/logout" />
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
