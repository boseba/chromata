import { HtmlUtils } from "../utils/html";
import { Grammar } from "./types/grammar";
import { Token } from "./types/token";

export class Highlighter {
  constructor(private grammar: Grammar) {}
  highlight(code: string): string {
    const tokens = this.grammar.tokenize(code);
    return tokens
      .map(
        (token: Token) =>
          `<span class="${token.type}">${HtmlUtils.escape(token.value)}</span>`
      )
      .join("");
  }
}
