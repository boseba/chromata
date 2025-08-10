import type { Theme } from "../core/theme";
import vscodeDark from "../themes/vscode-dark";

// The registry stores all available themes (built-in + custom)
const ThemeRegistry: Record<string, Theme> = {
  "vscode-dark": vscodeDark,
};

/** Retrieve a theme instance by name, fallback to default. */
export function getTheme(name = "vscode-dark"): Theme {
  return ThemeRegistry[name] || ThemeRegistry["vscode-dark"];
}

/** Register a new theme at runtime. */
export function registerTheme(name: string, theme: Theme): void {
  ThemeRegistry[name] = theme;
}
