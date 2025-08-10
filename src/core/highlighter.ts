import { Grammar } from "./types/grammar";
import { Token } from "./types/token";

export class Highlighter {
  constructor(private grammar: Grammar) {}
  highlight(code: string): string {
    const tokens = this.grammar.tokenize(code);
    return tokens
      .map(
        (token: Token) =>
          `<span class="${token.type}">${escapeHtml(token.value)}</span>`
      )
      .join("");
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
