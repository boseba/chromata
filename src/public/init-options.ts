/**
 * Options for initializing Chromata.
 */
export interface ChromataInitOptions {
  /** Programming language to highlight */
  language?: string;
  /** Theme name to use */
  theme?: string;
  /** Whether to inject the generated CSS into the DOM (default: true) */
  injectCss?: boolean;
}
