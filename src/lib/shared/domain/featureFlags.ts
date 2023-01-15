export default interface FeatureFlags {
  isJustASimpleTestEnabled(): boolean;
}

export const FeatureFlagsKey = Symbol();
