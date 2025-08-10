import { getTheme } from "./core/theme-registry";
import { ChromataInitOptions } from "./types/init-options";

export * from "./types";

const isBrowser = typeof document !== "undefined";

export const Chromata = {
  init(options?: ChromataInitOptions) {
    const chromataOptions = {
      language: "typescript",
      theme: "vscode-dark",
      injectCss: true,
      ...options,
    };

    if (chromataOptions.injectCss && isBrowser) {
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
};

export default Chromata;
