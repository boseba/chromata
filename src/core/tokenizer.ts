import { Match, Matcher, MatchInput, ScanContext, Token } from "./types";

export abstract class Tokenizer {
  private readonly matchers: Matcher[] = [];

  /**
   * Register a matcher in priority order (earlier = higher priority).
   */
  public addMatcher(matcher: Matcher): void {
    this.matchers.push(matcher);
  }

  /**
   * Tokenize input code using the registered matchers.
   * The order of matchers defines precedence.
   */
  public tokenize(code: string): Token[] {
    const source = this.preTokenize(code);
    const tokens: Token[] = [];

    let index = 0;

    const context: ScanContext = {
      previousToken: undefined,
      previousNonWhitespaceToken: undefined,
      peek: (offset: number): number | -1 => {
        const position = index + offset;
        if (position < 0 || position >= source.length) return -1;
        return source.codePointAt(position) ?? -1;
      },
    };

    while (index < source.length) {
      const match = this.tryMatchers(source, index, context);
      if (match) {
        const token: Token = {
          type: match.matcherName,
          classes: match.classes,
          start: index,
          end: index + match.length,
        };
        tokens.push(token);

        context.previousToken = token;
        if (/\S/.test(source.slice(token.start, token.end))) {
          context.previousNonWhitespaceToken = token;
        }

        index += match.length;
        continue;
      }

      // Fallback: emit one-char text token to guarantee progress
      const fallback: Token = {
        type: "text",
        classes: ["text"],
        start: index,
        end: index + 1,
      };
      tokens.push(fallback);

      context.previousToken = fallback;
      if (/\S/.test(source[fallback.start])) {
        context.previousNonWhitespaceToken = fallback;
      }

      index += 1;
    }

    return this.postTokenize(tokens, source);
  }

  /**
   * Pre-process code before tokenizing.
   */
  protected preTokenize(code: string): string {
    return code;
  }

  /**
   * Post-process tokens.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected postTokenize(tokens: Token[], code?: string): Token[] {
    return tokens;
  }

  /**
   * Try matchers in priority order at the given index.
   * Returns the first successful match, or null if none matched.
   */
  private tryMatchers(
    code: string,
    index: number,
    context: ScanContext
  ): { matcherName: string; classes: string[]; length: number } | null {
    const input: MatchInput = { code, index, context };

    for (const matcher of this.matchers) {
      const result: Match | null = matcher.match(input);
      if (!result) continue;

      const length = result.length ?? 0;
      if (!Number.isFinite(length) || length <= 0) continue;

      const classes = Array.isArray(result.classes)
        ? [...matcher.classes, ...result.classes]
        : [...matcher.classes];

      return { matcherName: matcher.name, classes, length };
    }

    return null;
  }
}
