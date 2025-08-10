import { Html } from "../utils/html";
import { Grammar } from "./types/grammar";

/**
 * Highlighter
 *
 * Converts source code into syntax-highlighted HTML using a provided Grammar.
 * Escapes all non-highlighted text to prevent HTML injection.
 */
export class Highlighter {
  constructor(private readonly grammar: Grammar) {}

  /**
   * Highlights the given code string.
   * @param code - Source code to highlight.
   * @returns HTML string with <span> elements wrapping matched tokens.
   */
  highlight(code: string): string {
    const tokens = this.grammar.tokenize(code);
    let html = "";
    let cursor = 0;

    for (const token of tokens) {
      // Emit unhighlighted text before the current token
      if (cursor < token.start) {
        html += Html.escape(code.slice(cursor, token.start));
      }
      // Emit the highlighted token span
      const chunk = code.slice(token.start, token.end);
      html += `<span class="${token.type}">${Html.escape(chunk)}</span>`;
      cursor = token.end;
    }

    // Emit any trailing unhighlighted text
    if (cursor < code.length) {
      html += Html.escape(code.slice(cursor));
    }

    return html;
  }
}
