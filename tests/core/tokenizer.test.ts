import { describe, expect, it } from "vitest";
import { TypeScriptGrammar } from "../../src/grammars/typescript";

describe("Tokenizer behavior via TypeScriptGrammar", () => {
  const grammar = new TypeScriptGrammar();

  it("produces non-overlapping, left-to-right tokens", () => {
    const code = '/*c*/"s" 123 if';
    const tokens = grammar.tokenize(code);

    // Ensure tokens are sorted and non-overlapping
    let lastEnd = 0;
    for (const t of tokens) {
      expect(t.start).toBeGreaterThanOrEqual(lastEnd);
      expect(t.end).toBeGreaterThan(t.start);
      lastEnd = t.end;
    }
  });

  it("handles trailing text after last token", () => {
    const code = "const x = 1  ";
    const tokens = grammar.tokenize(code);
    const last = tokens[tokens.length - 1];
    expect(last).toBeTruthy();
    // Last token should be the number "1"
    expect(code.slice(last.start, last.end)).toBe("1");
  });

  it("handles newlines and multi-line comments", () => {
    const code = `/* a
    b */
    const v = 0;`;

    const tokens = grammar.tokenize(code);
    expect(tokens.some((t) => t.type === "comment")).toBe(true);
    expect(tokens.some((t) => t.type === "keyword")).toBe(true);
    expect(tokens.some((t) => t.type === "number")).toBe(true);
  });
});
