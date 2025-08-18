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
    if (code.charCodeAt(index) !== 47 /* '/' */) return null;

    // Language-specific gate: only attempt a regex when allowed by context
    const previous = context.previousNonWhitespaceToken;
    const previousText = previous
      ? code.slice(previous.start, previous.end)
      : undefined;
    if (!this.allowsAfter(previous, previousText)) return null;

    // Scan /pattern/ with escapes and character classes
    let cursor = index + 1;
    let inClass = false;
    let inEscape = false;

    while (cursor < code.length) {
      const codePoint = code.charCodeAt(cursor);

      if (!inEscape) {
        if (codePoint === 91) inClass = true; // '['
        else if (codePoint === 93) inClass = false; // ']'
        else if (codePoint === 47 && !inClass) {
          // closing '/'
          cursor += 1;
          break;
        }
      }

      inEscape = !inEscape && codePoint === 92; // '\'
      cursor += 1;
    }

    // No closing '/', or empty pattern -> not a regex literal
    if (cursor <= index + 1 || cursor > code.length) return null;

    // Flags: a..z letters
    while (cursor < code.length) {
      const flag = code.charCodeAt(cursor);
      if (flag >= 97 && flag <= 122) {
        cursor += 1;
        continue;
      }
      break;
    }

    return { length: cursor - index };
  }
}
