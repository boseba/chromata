import { describe, expect, it } from "vitest";
import { TypeScriptGrammar } from "../../src/grammars/typescript/typescript";

describe("TypeScriptGrammar", () => {
  const grammar = new TypeScriptGrammar();

  it("tokenizes keywords, strings, numbers and comments", () => {
    const code = `
      // comment
      const x = 42;
      let s = "hello";
      /* block comment */ if (x > 0) { return s; }
    `;
    const tokens = grammar.tokenize(code);

    expect(tokens.some((t) => t.type === "comment")).toBe(true);
    expect(tokens.some((t) => t.type === "keyword")).toBe(true); // const/let/if/return
    expect(tokens.some((t) => t.type === "number")).toBe(true); // 42
    expect(tokens.some((t) => t.type === "string")).toBe(true); // "hello"
  });

  it("gives precedence to comments and strings over keywords inside them", () => {
    const code = `// return "if" 123
    const s = "return if 123";
    `;
    const tokens = grammar.tokenize(code);

    // Everything on line 1 should be a single comment token (no keyword/number tokens inside)
    const line1Start = 0;
    const line1End = code.indexOf("\n");
    const overlapping = tokens.filter(
      (t) => t.start >= line1Start && t.end <= line1End
    );
    expect(overlapping.length).toBe(1);
    expect(overlapping[0].type).toBe("comment");

    // The string on line 2 should be a single string token, with keywords not split
    const stringToken = tokens.find((t) => t.type === "string");
    expect(stringToken).toBeTruthy();
  });

  it("does not produce tokens for plain identifiers or whitespace", () => {
    const code = "foo bar baz";
    const tokens = grammar.tokenize(code);
    expect(tokens.length).toBe(0);
  });
});
