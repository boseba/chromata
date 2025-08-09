export type ThemeDefinition = Record<string, string>;

export class Theme {
  constructor(
    public readonly name: string,
    public readonly markers: ThemeDefinition
  ) {}

  toString(): string {
    let css = `.chromata.${this.name} {\n`;
    for (const [marker, color] of Object.entries(this.markers)) {
      css += `  .${marker} { color: ${color}; }\n`;
    }
    css += "}\n";
    return css;
  }
}
