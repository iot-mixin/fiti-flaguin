import type FeatureFlags from "$lib/shared/domain/featureFlags";
import { getContext, setContext } from "svelte";

const FeatureFlagsKey = Symbol();

export const initFlagContext = (featureFlags: FeatureFlags) => {
  setContext<{ featureFlags: FeatureFlags }>(FeatureFlagsKey, {
    featureFlags
  });
};

export const getFeatureFlags = (): FeatureFlags => {
  const { featureFlags } = getContext<{ featureFlags: FeatureFlags }>(FeatureFlagsKey);
  return featureFlags;
};
