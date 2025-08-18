import { Theme } from "../core/theme";

const vscodeDark = new Theme("vscode-dark", {
  background: "#1F1F1F",
  text: "#9cdcfe",

  // Core
  keyword: "#569cd6",
  string: "#ce9178",
  number: "#b5cea8",
  comment: "#6a9955",

  // Extended
  literal: "#b5cea8", // true/false/null/undefined/NaN/Infinity
  typeKeyword: "#c586c0", // interface, type, enum, readonly, etc.
  typeBuiltin: "#4ec9b0", // string, number, boolean, any, ...
  decorator: "#c586c0", // @decorator
  regex: "#d16969", // regex literal
  operator: "#d4d4d4", // keep near default foreground
  punctuation: "#d4d4d4", // keep near default foreground
});

export default vscodeDark;
