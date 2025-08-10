import type { Theme } from "../core/theme";
import vscodeDark from "../themes/vscode-dark";

// The registry stores all available themes (built-in + custom)
const ThemeRegistry: Record<string, Theme> = {
  "vscode-dark": vscodeDark,
};

/**
 * Retrieves a theme instance by name.
 * Falls back to the default "vscode-dark" theme if the requested one is not found.
 *
 * @param name - Theme name to retrieve.
 * @returns Theme instance.
 */
export function getTheme(name = "vscode-dark"): Theme {
  return ThemeRegistry[name] || ThemeRegistry["vscode-dark"];
}

/**
 * Registers a new theme at runtime.
 * If a theme with the same name exists, it will be overwritten.
 *
 * @param name - Name under which the theme will be stored.
 * @param theme - Theme definition.
 */
export function registerTheme(name: string, theme: Theme): void {
  ThemeRegistry[name] = theme;
}
