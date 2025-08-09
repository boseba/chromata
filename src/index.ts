import { ChromataInitOptions } from "./types/init-options";

export * from "./types";

export function init(options: ChromataInitOptions) {
  const {
    language = "typescript",
    theme = "vscode-dark",
    injectCss = true,
  } = options;

  if (injectCss) {
    // Dynamically import theme and inject <style>
    import(`./themes/${theme}.js`).then((themeModule) => {
      const css = themeModule.default.toString();
      const style = document.createElement("style");

      style.textContent = css;

      document.head.appendChild(style);
    });
  }
}
