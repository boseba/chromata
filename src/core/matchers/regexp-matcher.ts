import { Match, Matcher, MatchInput } from "../types";

export class RegExpMatcher implements Matcher {
  public readonly name: string;
  public readonly classes: string[];
  private readonly regex: RegExp;

  constructor(args: { name: string; classes: string[]; regex: RegExp }) {
    this.name = args.name;
    this.classes = args.classes;
    const flags = new Set(args.regex.flags.split(""));
    flags.add("y");
    this.regex = new RegExp(args.regex.source, Array.from(flags).join(""));
  }

  match({ code, index }: MatchInput): Match | null {
    this.regex.lastIndex = index;
    const execResult = this.regex.exec(code);
    if (!execResult || execResult.index !== index) return null;
    const length = execResult[0].length;
    if (length <= 0) return null;
    return { length };
  }
}
