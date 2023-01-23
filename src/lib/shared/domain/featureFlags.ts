export default interface FeatureFlags {
  isJustASimpleTestEnabled(): Promise<boolean>;
}
