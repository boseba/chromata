import { Tokenizer } from "../core/tokenizer";

// Token regex definitions (MVP)
// Order matters: comments → strings → numbers → keywords
const KEYWORDS =
  /\b(async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|if|import|in|instanceof|interface|let|new|null|return|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/;
const STRING = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/;
const NUMBER = /\b\d+(?:\.\d+)?\b/;
const COMMENT = /\/\/[^\n]*|\/\*[\s\S]*?\*\//;

/**
 * Grammar for tokenizing TypeScript code.
 * Extends the generic Tokenizer and registers language-specific patterns.
 */
export class TypeScriptGrammar extends Tokenizer {
  constructor() {
    super();
    this.registerPatterns();
  }

  /**
   * Registers token patterns in priority order to ensure
   * higher-priority matches (e.g., comments, strings) take precedence.
   */
  private registerPatterns(): void {
    this.addPattern("comment", COMMENT);
    this.addPattern("string", STRING);
    this.addPattern("number", NUMBER);
    this.addPattern("keyword", KEYWORDS);
  }
}

/** Singleton instance of the TypeScript grammar. */
export const typeScriptGrammar = new TypeScriptGrammar();
