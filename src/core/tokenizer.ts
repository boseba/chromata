import { Grammar } from "./types/grammar";
import { Token } from "./types/token";

/**
 * Base tokenizer for syntax highlighting.
 *
 * Builds a single "master" RegExp from registered token patterns
 * (one named capture group per pattern) and scans the input in one pass.
 *
 * Extending classes (e.g., TypeScriptGrammar) add language-specific patterns
 * via `addPattern()`. Pattern order determines match priority.
 */
export abstract class Tokenizer implements Grammar {
  /** List of token type / regex pairs, in priority order. */
  protected patterns: Array<[type: string, re: RegExp]> = [];

  /** Cached compiled master RegExp, rebuilt when patterns change. */
  private _regexp?: RegExp;

  /**
   * Tokenizes a code string into a list of token spans.
   *
   * @param code - Source code to tokenize.
   * @returns An array of tokens with start, end, and type.
   */
  tokenize(code: string): Token[] {
    const spans: Token[] = [];
    const re = this.buildRegex();
    const patterns = this.patterns;
    let i = 0;

    while (i < code.length) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m) {
        const start = m.index;
        const end = re.lastIndex;

        // Identify the matched group name (token type)
        const g = (m.groups || {}) as Record<string, string | undefined>;
        let type: string | undefined;
        for (const [name] of patterns) {
          if (g[name]) {
            type = name;
            break;
          }
        }
        if (type) spans.push({ start, end, type });

        i = end;
        if (end === start) i++; // Prevent infinite loop on zero-width matches
      } else {
        i++;
      }
    }
    return spans;
  }

  /**
   * Adds a token pattern to the tokenizer.
   * Order matters: earlier patterns have higher priority.
   * Invalidates the cached master regex.
   */
  protected addPattern(name: string, regexp: RegExp): void {
    this.patterns.push([name, regexp]);
    this._regexp = undefined;
  }

  /**
   * Builds (or returns cached) master RegExp combining all patterns.
   * Adds `g` (global) and `y` (sticky) flags by default, preserving
   * any flags from individual patterns.
   */
  private buildRegex(extraFlags = ""): RegExp {
    if (this._regexp) return this._regexp;

    const flags = new Set<string>();
    for (const [, regexp] of this.patterns) {
      for (const flag of regexp.flags) {
        flags.add(flag);
      }
    }

    flags.add("g");
    flags.add("y");

    for (const flag of extraFlags) flags.add(flag);

    const source = this.patterns
      .map(([name, regexp]) => `(?<${name}>${regexp.source})`)
      .join("|");

    this._regexp = new RegExp(source, [...flags].sort().join(""));
    return this._regexp;
  }
}
