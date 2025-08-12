export class RegExpUtils {
  static escapeLiteral(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  static buildWord(words: readonly string[], ci = false): RegExp {
    const unique = Array.from(new Set(words)).sort(
      (a, b) => b.length - a.length
    );
    const source =
      "\\b(?:" + unique.map(RegExpUtils.escapeLiteral).join("|") + ")\\b";
    return new RegExp(source, ci ? "i" : "");
  }

  static withSticky(re: RegExp): RegExp {
    const flags = new Set(re.flags.split(""));
    flags.add("y");
    return new RegExp(re.source, Array.from(flags).join(""));
  }
}
