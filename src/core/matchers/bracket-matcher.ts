import { Match, Matcher, MatchInput } from "../types";

/**
 * Stateful matcher that classifies (), [] and {} as "punctuation bracket"
 * and assigns a cyclic bracket level class: bracket-level1..N.
 */
export class BracketMatcher implements Matcher {
  public readonly name = "bracket";
  public readonly classes = ["punctuation", "bracket"];

  private nestingLevel = 0;
  private readonly bucketCount: number;
  private readonly openSet = new Set(["{", "[", "("]);
  private readonly closeSet = new Set(["}", "]", ")"]);

  constructor(bucketCount = 3) {
    this.bucketCount = Math.max(1, bucketCount | 0);
  }

  match({ code, index }: MatchInput): Match | null {
    const character = code[index];
    if (!character) return null;
    const isOpen = this.openSet.has(character);
    const isClose = this.closeSet.has(character);
    if (!isOpen && !isClose) return null;

    let levelForToken: number;
    if (isOpen) {
      this.nestingLevel += 1;
      levelForToken = ((this.nestingLevel - 1) % this.bucketCount) + 1;
    } else {
      levelForToken = ((this.nestingLevel - 1) % this.bucketCount) + 1;
      this.nestingLevel = Math.max(0, this.nestingLevel - 1);
    }

    return { length: 1, classes: [`bracket-level${levelForToken}`] };
  }
}
