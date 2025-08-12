import { BracketMatcher, RegExpMatcher } from "../../core/matchers";
import { RegExpLiteralMatcher } from "../../core/matchers/regexp-literal-matcher";
import { Tokenizer } from "../../core/tokenizer";
import { Matcher, Token } from "../../core/types";
import { RegExpUtils } from "../../utils/regexp";
import {
  ES_KEYWORDS,
  TS_BUILTIN_TYPES,
  TS_LITERALS,
  TS_TYPE_KEYWORDS,
} from "./keywords";

export class TypeScriptGrammar extends Tokenizer {
  public readonly name = "typescript";

  constructor() {
    super();

    // Word-based RegExp (built once for readability and reuse)
    const LITERAL_RE = RegExpUtils.buildWord(TS_LITERALS);
    const TYPE_KEYWORD_RE = RegExpUtils.buildWord(TS_TYPE_KEYWORDS);
    const TYPE_BUILTIN_RE = RegExpUtils.buildWord(TS_BUILTIN_TYPES);
    const KEYWORD_RE = RegExpUtils.buildWord(ES_KEYWORDS);

    // Core lexical patterns
    const COMMENT = /\/\/[^\n]*|\/\*[\s\S]*?\*\//;
    const STRING = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/;
    const NUMBER =
      /\b(?:0[xX][0-9A-Fa-f](?:_?[0-9A-Fa-f])*|0[bB][01](?:_?[01])*|0[oO][0-7](?:_?[0-7])*|(?:\d(?:_?\d)*)?(?:\.(?:\d(?:_?\d)*)?)?(?:[eE][+-]?\d(?:_?\d)*)?)(?:n)?\b/;
    const DECORATOR =
      /@[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*(?:\s*\([^)]*\))?/;
    const OPERATOR =
      />>>=|>>>|<<=|>>=|\?\?=|\|\|=|&&=|\*\*=|===|!==|=>|<=|>=|\+\+|--|\|\||&&|\?\?|<<|>>>|>>|\+=|-=|\*=|\/=|%=|\^=|&=|\|=|!=|==|\.\.\.|[+\-*/%&|^~!?<>:=]/;
    const PUNCTUATION = /[.,;:]/; // brackets excluded

    // Language-specific predicate for RegExp literal
    const KEYWORDS_ALLOWING_EXPR = new Set([
      "return",
      "case",
      "throw",
      "typeof",
      "delete",
      "void",
      "new",
    ]);
    const OPENING_BRACKETS = new Set(["(", "{", "["]);
    const SEPARATORS = new Set([",", ":", ";"]);

    const allowsRegExpAfter = (
      previous?: Token,
      previousText?: string
    ): boolean => {
      if (!previous) return true;
      if (previous.type === "operator") return true;
      if (
        previous.type === "keyword" &&
        previousText &&
        KEYWORDS_ALLOWING_EXPR.has(previousText)
      )
        return true;
      if (
        previous.type === "bracket" &&
        previousText &&
        OPENING_BRACKETS.has(previousText)
      )
        return true;
      if (
        previous.type === "punctuation" &&
        previousText &&
        SEPARATORS.has(previousText)
      )
        return true;
      return false;
    };

    const matchersInPriority: Matcher[] = [
      new RegExpMatcher({
        name: "comment",
        classes: ["comment"],
        regex: COMMENT,
      }),
      new RegExpMatcher({ name: "string", classes: ["string"], regex: STRING }),

      new RegExpLiteralMatcher(allowsRegExpAfter), // before number/operator

      new RegExpMatcher({ name: "number", classes: ["number"], regex: NUMBER }),
      new RegExpMatcher({
        name: "literal",
        classes: ["literal"],
        regex: LITERAL_RE,
      }),
      new RegExpMatcher({
        name: "typeKeyword",
        classes: ["typeKeyword"],
        regex: TYPE_KEYWORD_RE,
      }),
      new RegExpMatcher({
        name: "typeBuiltin",
        classes: ["typeBuiltin"],
        regex: TYPE_BUILTIN_RE,
      }),
      new RegExpMatcher({
        name: "keyword",
        classes: ["keyword"],
        regex: KEYWORD_RE,
      }),
      new RegExpMatcher({
        name: "decorator",
        classes: ["decorator"],
        regex: DECORATOR,
      }),

      new RegExpMatcher({
        name: "operator",
        classes: ["operator"],
        regex: OPERATOR,
      }),

      new BracketMatcher(3),

      new RegExpMatcher({
        name: "punctuation",
        classes: ["punctuation"],
        regex: PUNCTUATION,
      }),
    ];

    for (const matcher of matchersInPriority) {
      this.addMatcher(matcher);
    }
  }
}

export const typeScriptGrammar = new TypeScriptGrammar();
