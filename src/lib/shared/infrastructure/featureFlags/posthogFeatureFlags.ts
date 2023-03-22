import type FeatureFlags from "$lib/shared/domain/featureFlags";
import type { PostHog } from "posthog-js";

export default class PostHogFeatureFlags implements FeatureFlags {
  constructor(private client: Promise<PostHog>) {}

  private async checkFlag(flagName: string): Promise<boolean> {
    const client = await this.client;
    return client.isFeatureEnabled(flagName);
  }

  async isJustASimpleTestEnabled() {
    return this.checkFlag("JustASimpleTest");
  }

  async isCustomTitleEnabled() {
    return this.checkFlag("enableCustomTitle");
  }
}
