import { describe, expect, it } from "vitest";
import { Highlighter } from "../../src/core/highlighter";
import { TypeScriptGrammar } from "../../src/grammars/typescript";

describe("Highlighter", () => {
  const highlighter = new Highlighter(new TypeScriptGrammar());

  it("wraps tokens in span with class matching token type", () => {
    const code = "const x = 1; // note";
    const html = highlighter.highlight(code);

    // A keyword span, number span, and comment span should appear
    expect(html).toMatch(/<span class="keyword">const<\/span>/);
    expect(html).toMatch(/<span class="number">1<\/span>/);
    expect(html).toMatch(/<span class="comment">\/\/ note<\/span>/);
  });

  it("escapes unhighlighted regions", () => {
    const code = "<tag> 42";
    const html = highlighter.highlight(code);

    // The "<tag>" part isn't a token; it must be escaped as text
    expect(html).toContain("&lt;tag&gt;");
    expect(html).not.toContain("<tag>");
  });

  it("escapes inside span content as well", () => {
    const code = '"a<b>" // c>d';
    const html = highlighter.highlight(code);

    // String token must contain escaped <
    expect(html).toMatch(/<span class="string">"a&lt;b&gt;"<\/span>/);
    // Comment token must contain escaped >
    expect(html).toMatch(/<span class="comment">\/\/ c&gt;d<\/span>/);
  });

  it("returns empty string for empty input", () => {
    expect(highlighter.highlight("")).toBe("");
  });
});
