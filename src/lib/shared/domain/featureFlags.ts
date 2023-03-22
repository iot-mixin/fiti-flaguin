export default interface FeatureFlags {
  isJustASimpleTestEnabled(): Promise<boolean>;
  isCustomTitleEnabled(): Promise<boolean>;
}
