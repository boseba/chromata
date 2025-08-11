import { Tokenizer } from "../core/tokenizer";

/**
 * TypeScript grammar with extended coverage.
 * Pattern order matters: higher-priority patterns must be registered first.
 *
 * Design notes:
 * - Template strings are treated as a single "string" token (including ${...}).
 * - Regex literals use a conservative lookbehind to reduce false positives.
 * - Generics are not parsed specially; angle brackets are "operator"/"punctuation".
 */

// Comments
const COMMENT = /\/\/[^\n]*|\/\*[\s\S]*?\*\//;

// Strings (single, double, template). Template includes interpolations verbatim.
const STRING = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/;

// Regex literal: must appear after a token that can precede an expression.
// Uses lookbehind to avoid treating division as a regex.
const REGEX_LITERAL =
  /(?:(?<=^)|(?<=[\(\{\[;,=:\+\*\!\?\&\|\^\~%<>-]))\/(?:\\.|[^\/\\\n])+(?:\/[a-z]*)/;

// Numbers: decimal, hex, binary, octal, bigint, with numeric separators.
const NUMBER =
  /\b(?:0[xX][0-9A-Fa-f](?:_?[0-9A-Fa-f])*|0[bB][01](?:_?[01])*|0[oO][0-7](?:_?[0-7])*|(?:\d(?:_?\d)*)?(?:\.(?:\d(?:_?\d)*)?)?(?:[eE][+\-]?\d(?:_?\d)*)?)(?:n)?\b/;

// Boolean/null/undefined literals
const LITERAL = /\b(?:true|false|null|undefined|NaN|Infinity)\b/;

// TypeScript type keywords (reserved in type positions)
const TYPE_KEYWORD =
  /\b(?:interface|type|enum|namespace|abstract|implements|declare|readonly|keyof|infer|satisfies|override|as|asserts|is)\b/;

// Built-in types
const TYPE_BUILTIN =
  /\b(?:string|number|boolean|any|unknown|never|void|object|bigint|symbol)\b/;

// ECMAScript keywords (complete set)
const KEYWORD =
  /\b(?:break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|new|return|super|switch|this|throw|try|typeof|var|let|while|with|yield)\b/;

// Decorators: @Name(.Sub)?(args)?
const DECORATOR = /@[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*(?:\s*\([^)]*\))?/;

// Operators: multi-char first, then singles
const OPERATOR =
  />>>=|>>>|<<=|>>=|\?\?=|\|\|=|&&=|\*\*=|===|!==|=>|<=|>=|\+\+|--|\|\||&&|\?\?|<<|>>>|>>|\+=|-=|\*=|\/=|%=|\^=|&=|\|=|!=|==|[+\-*/%&|^~!?<>:=]/;

// Punctuation
const PUNCTUATION = /[()\[\]{},;.:]/;

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
    // Highest priority first
    this.addPattern("comment", COMMENT);
    this.addPattern("string", STRING);
    this.addPattern("regex", REGEX_LITERAL);
    this.addPattern("number", NUMBER);
    this.addPattern("literal", LITERAL);
    this.addPattern("typeKeyword", TYPE_KEYWORD);
    this.addPattern("typeBuiltin", TYPE_BUILTIN);
    this.addPattern("keyword", KEYWORD);
    this.addPattern("decorator", DECORATOR);
    this.addPattern("operator", OPERATOR);
    this.addPattern("punctuation", PUNCTUATION);
  }
}

/** Singleton instance of the TypeScript grammar. */
export const typeScriptGrammar = new TypeScriptGrammar();
