// src/matchers/regexp-literal.matcher.ts
import type { Match, Matcher, MatchInput, Token } from "../types";

export class RegExpLiteralMatcher implements Matcher {
  public readonly name = "regex";
  public readonly classes = ["regex"];
  private readonly allowsAfter: (prev?: Token, prevText?: string) => boolean;

  constructor(allowsAfter: (prev?: Token, prevText?: string) => boolean) {
    this.allowsAfter = allowsAfter;
  }

  public match({ code, index, context }: MatchInput): Match | null {
    // Must start with '/'
    if (code.charCodeAt(index) !== 47) return null;

    const previous = context.previousNonWhitespaceToken;
    const previousText = previous
      ? code.slice(previous.start, previous.end)
      : undefined;
    if (!this.allowsAfter(previous, previousText)) return null;

    // Parse /pattern/flags with escapes and character classes
    let cursor = index + 1;
    let inEscape = false;
    let inCharClass = false;

    while (cursor < code.length) {
      const charCode = code.charCodeAt(cursor);

      if (!inEscape) {
        if (charCode === 91) {
          // '['
          inCharClass = true;
        } else if (charCode === 93) {
          // ']'
          inCharClass = false;
        } else if (charCode === 47 && !inCharClass) {
          // '/' closes the regex
          cursor += 1;
          break;
        } else if (!inCharClass && (charCode === 10 || charCode === 13)) {
          // Line terminators are not allowed in regex literal (outside char class)
          return null;
        }
      }

      inEscape = !inEscape && charCode === 92; // '\'
      cursor += 1;
    }

    // No closing '/' found
    if (cursor <= index + 1 || cursor > code.length) return null;

    // Parse flags [a-z]*
    while (cursor < code.length) {
      const flagCode = code.charCodeAt(cursor);
      if (flagCode >= 97 && flagCode <= 122) {
        cursor += 1;
      } else {
        break;
      }
    }

    return { length: cursor - index };
  }
}
