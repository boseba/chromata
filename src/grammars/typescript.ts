import { Grammar } from "../core/types/grammar";
import { Token } from "../core/types/token";

const KEYWORDS =
  /\b(async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|if|import|in|instanceof|interface|let|new|null|return|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/;
const STRING = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/;
const NUMBER = /\b\d+(?:\.\d+)?\b/;
const COMMENT = /\/\/[^\n]*|\/\*[\s\S]*?\*\//;

export const TypeScriptGrammar: Grammar = {
  tokenize(code: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    const patterns = [
      ["comment", COMMENT],
      ["string", STRING],
      ["number", NUMBER],
      ["keyword", KEYWORDS],
    ] as const;

    while (i < code.length) {
      let matched = false;
      for (const [type, regExp] of patterns) {
        regExp.lastIndex = 0;
        const match = regExp.exec(code.slice(i));
        if (match && match.index === 0) {
          tokens.push({ type, value: match[0] });
          i += match[0].length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        tokens.push({ type: "text", value: code[i] });
        i++;
      }
    }
    return tokens;
  },
};
