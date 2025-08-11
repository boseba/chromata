import { describe, expect, it } from "vitest";
import { Theme } from "../../src/core/theme";

describe("Theme", () => {
  it("generates scoped CSS for markers", () => {
    const t = new Theme("vscode-dark", {
      keyword: "#569cd6",
      string: "#ce9178",
    });

    const css = t.toString();
    expect(css).toContain(".chromata.vscode-dark {");
    expect(css).toContain("  .keyword { color: #569cd6; }");
    expect(css).toContain("  .string { color: #ce9178; }");
    expect(css.trim().endsWith("}")).toBe(true);
  });

  it("handles empty markers", () => {
    const t = new Theme("empty", {});
    const css = t.toString();
    expect(css).toBe(".chromata.empty {\n}\n");
  });
});
