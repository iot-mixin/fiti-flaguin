import { browser } from "$app/environment";
import type FeatureFlags from "$lib/shared/domain/featureFlags";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import type { LayoutLoad } from "./$types";
import PostHogClientFactory from "$lib/shared/infrastructure/featureFlags/postHogClientFactory";
import PostHogFeatureFlags from "$lib/shared/infrastructure/featureFlags/posthogFeatureFlags";

export const load: LayoutLoad = async (event) => {
  const { session } = await getSupabase(event);

  let featureFlags!: FeatureFlags;
  if (browser) {
    featureFlags = new PostHogFeatureFlags(PostHogClientFactory.createClient());
  }
  return { session, featureFlags };
};
