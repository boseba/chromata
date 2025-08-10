import { Token } from "./token";

export interface Grammar {
  tokenize(code: string): Token[];
}
