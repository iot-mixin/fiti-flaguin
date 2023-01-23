import { PUBLIC_POSTHOG_KEY } from "$env/static/public";
import type { PostHog } from "posthog-js";
import { posthog } from "posthog-js";

export default class PostHogClientFactory {
  private static client: PostHog;

  static async createClient(): Promise<PostHog> {
    let client = PostHogClientFactory.getClient();
    if (client == null) {
      client = await PostHogClientFactory.createAndConnectClient();
      PostHogClientFactory.registerClient(client);
    }
    return client;
  }

  private static getClient(): PostHog {
    return PostHogClientFactory.client;
  }

  private static async createAndConnectClient(): Promise<PostHog> {
    const client = posthog.init(PUBLIC_POSTHOG_KEY, {
      api_host: "https://eu.posthog.com",
      autocapture: false
    }) as PostHog;
    await new Promise<void>((resolve, reject) => {
      try {
        client.onFeatureFlags(() => resolve());
      } catch (err) {
        reject();
      }
    });
    return client;
  }

  private static registerClient(client: PostHog): void {
    PostHogClientFactory.client = client;
  }
}
