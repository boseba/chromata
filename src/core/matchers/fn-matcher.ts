import { Match, Matcher, MatchInput } from "../types";
import { MatcherFunction } from "../types/matcher-function";

export class FnMatcher implements Matcher {
  public readonly name: string;
  public readonly classes: string[];
  private readonly fn: MatcherFunction;

  constructor(args: { name: string; classes: string[]; fn: MatcherFunction }) {
    this.name = args.name;
    this.classes = args.classes;
    this.fn = args.fn;
  }

  public match(input: MatchInput): Match | null {
    const result = this.fn(input);
    if (!result) return null;
    const length = result.length;
    if (!Number.isFinite(length) || length <= 0) return null;
    return result;
  }
}
