import { ChromataInitOptions } from "./types/init-options";
export * from "./types";

import { Highlighter } from "./core/highlighter";
import { getTheme } from "./core/theme-registry";
import { TypeScriptGrammar } from "./grammars/typescript";

const isBrowser = typeof document !== "undefined";

// Single highlighter instance for MVP (default: TypeScript)
let defaultHighlighter = new Highlighter(TypeScriptGrammar);

export const Chromata = {
  init(options?: ChromataInitOptions) {
    const chromataOptions = {
      language: "typescript",
      theme: "vscode-dark",
      injectCss: true,
      ...options,
    };

    // Prepare the default highlighter based on language (MVP: only TS for now)
    if (chromataOptions.language === "typescript") {
      defaultHighlighter = new Highlighter(TypeScriptGrammar);
    } else {
      // Fallback to TypeScript for now
      defaultHighlighter = new Highlighter(TypeScriptGrammar);
    }

    if (chromataOptions.injectCss && isBrowser) {
      // Inject Theme CSS into <head>
      const css = getTheme(chromataOptions.theme).toString();

      document
        .querySelectorAll(`style[data-chromata="${chromataOptions.theme}"]`)
        .forEach((n) => n.remove());

      const style = document.createElement("style");
      style.setAttribute("data-chromata", chromataOptions.theme);
      style.textContent = css;
      document.head.appendChild(style);
    }
  },

  /**
   * Highlight a code string to HTML using the default highlighter.
   * For MVP we only support TypeScript; other languages will be added incrementally.
   */
  highlight(code: string): string {
    return defaultHighlighter.highlight(code ?? "");
  },
};

export default Chromata;
