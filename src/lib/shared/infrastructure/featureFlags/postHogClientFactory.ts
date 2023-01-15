import { PUBLIC_POSTHOG_KEY } from "$env/static/public";
import type { PostHog } from "posthog-js";
import { posthog } from "posthog-js";

export default class PostHogClientFactory {
  private static client: PostHog;

  static createClient(): PostHog {
    let client = PostHogClientFactory.getClient();
    if (client == null) {
      client = PostHogClientFactory.createAndConnectClient();
      PostHogClientFactory.registerClient(client);
    }
    return client;
  }

  private static getClient(): PostHog {
    return PostHogClientFactory.client;
  }

  private static createAndConnectClient(): PostHog {
    return posthog.init(PUBLIC_POSTHOG_KEY, {
      api_host: "https://eu.posthog.com",
      autocapture: false
    }) as PostHog;
  }

  private static registerClient(client: PostHog): void {
    PostHogClientFactory.client = client;
  }
}
