import { ChromataInitOptions } from "./public/init-options";
export * from "./public";

import { Highlighter } from "./core/highlighter";
import { getTheme } from "./core/theme-registry";
import { typeScriptGrammar } from "./grammars/typescript/typescript";

const isBrowser = typeof document !== "undefined";

// Single highlighter instance for MVP (default: TypeScript)
const defaultHighlighter = new Highlighter(typeScriptGrammar);
let chromataOptions: ChromataInitOptions = {
  language: "typescript",
  theme: "vscode-dark",
  injectCss: true,
};

/**
 * Chromata main API.
 *
 * Provides initialization and highlighting capabilities.
 *
 * - `init()` configures the default grammar, theme, and optionally injects CSS into the DOM.
 * - `highlight()` converts a code string into syntax-highlighted HTML.
 */
export const Chromata = {
  /**
   * Initializes Chromata with optional configuration.
   *
   * @param options - Initialization options such as language, theme, and CSS injection flag.
   *
   * Notes:
   * - Currently defaults to TypeScript grammar.
   * - Automatically injects the theme's CSS into the browser DOM if `injectCss` is true.
   * - Removes previously injected style tags for the same theme to prevent duplicates (e.g., on HMR).
   */
  init(options?: ChromataInitOptions) {
    if (options) {
      Object.assign(chromataOptions, options);
    }

    // TODO: when other grammars exist, switch on chromataOptions.language

    if (chromataOptions.injectCss && isBrowser) {
      // Remove existing <style> for this theme (avoids duplicates on HMR/re-init)
      document
        .querySelectorAll(`style[data-chromata="${chromataOptions.theme}"]`)
        .forEach((el) => el.remove());

      // Inject theme CSS into <head>
      const css = getTheme(chromataOptions.theme).toString();
      const style = document.createElement("style");
      style.setAttribute("data-chromata", chromataOptions.theme as string);
      style.textContent = css;
      document.head.appendChild(style);
    }
  },

  /**
   * Highlights a code string to HTML using the default highlighter.
   *
   * @param code - Code string to highlight.
   * @returns HTML string with syntax highlighting.
   */
  highlight(code: string): string {
    const html = defaultHighlighter.highlight(code ?? "");

    return `<pre><code class="chromata language-${chromataOptions.language} ${chromataOptions.theme}">${html}</code></pre>`;
  },
};

export default Chromata;
