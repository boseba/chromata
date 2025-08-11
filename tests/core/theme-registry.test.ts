import { describe, expect, it } from "vitest";
import { Theme } from "../../src/core/theme";
import { getTheme, registerTheme } from "../../src/core/theme-registry";

describe("Theme registry", () => {
  it("returns default theme when no name provided", () => {
    const theme = getTheme();
    expect(theme).toBeTruthy();
    expect(theme.name).toBe("vscode-dark");
  });

  it("can register and retrieve a custom theme", () => {
    const custom = new Theme("my-theme", { keyword: "#ff00ff" });
    registerTheme("my-theme", custom);

    const retrieved = getTheme("my-theme");
    expect(retrieved).toBe(custom);
    expect(retrieved.markers.keyword).toBe("#ff00ff");
  });

  it("falls back to default for unknown names", () => {
    const theme = getTheme("does-not-exist");
    expect(theme.name).toBe("vscode-dark");
  });
});
