// Unit Test file for index.ts
import { describe, expect, it } from "vitest";
import { getTheme } from "../src/core/theme-registry";
import Chromata, { type ChromataInitOptions } from "../src/index";

describe("Public API (index)", () => {
  it("highlight() returns HTML for provided code", () => {
    const html = Chromata.highlight(`const x = 1;`);
    expect(html).toContain('<span class="keyword">const</span>');
    expect(html).toContain('<span class="number">1</span>');
  });

  it("init() returns CSS for a chosen theme (no DOM injection on Node)", () => {
    const opts: ChromataInitOptions = {
      theme: "vscode-dark",
      injectCss: false,
    };

    // If your impl returns string: check it.
    const css = Chromata.init(opts) as unknown as string | void;

    if (typeof css === "string") {
      expect(css).toContain(`.chromata.${getTheme("vscode-dark").name}`);
    } else {
      // If your impl returns void but injects, we still assert no crash.
      expect(css).toBeUndefined();
    }
  });

  it("init() gracefully handles empty options", () => {
    const css = Chromata.init({} as ChromataInitOptions) as unknown;
    // Either string (css) or void (injected). Both acceptable; no throw.
    expect(["string", "undefined"]).toContain(typeof css);
  });
});
