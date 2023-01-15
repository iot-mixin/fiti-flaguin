import type FeatureFlags from "$lib/shared/domain/featureFlags";
import type { PostHog } from "posthog-js";

export default class PostHogFeatureFlags implements FeatureFlags {
  constructor(private client: PostHog) {}

  private checkFlag(flagName: string): boolean {
    return this.client.isFeatureEnabled(flagName);
  }

  isJustASimpleTestEnabled() {
    return this.checkFlag("JustASimpleTest");
  }
}
