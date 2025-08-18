/** Mapping of token type (marker) to CSS color value. */
export type ThemeDefinition = Record<string, string>;

/**
 * Represents a syntax highlighting theme.
 * Stores a name and a set of token type → color mappings,
 * and can generate its corresponding CSS string.
 */
export class Theme {
  constructor(
    /** Theme name, also used as a CSS class selector. */
    public readonly name: string,

    /** Mapping of token types to their corresponding colors. */
    public readonly markers: ThemeDefinition
  ) {}

  /**
   * Generates a CSS string for this theme.
   * The output is scoped to `.chromata.{name}` to avoid collisions.
   *
   * @returns CSS rules as a string.
   */
  toString(): string {
    let css = `.chromata.${this.name} {\n`;
    css += `  background: ${this.markers["background"]}; color: ${this.markers["text"]};`;

    for (const [marker, color] of Object.entries(this.markers)) {
      css += `  .${marker} { color: ${color}; }\n`;
    }
    css += "}\n";
    return css;
  }
}
