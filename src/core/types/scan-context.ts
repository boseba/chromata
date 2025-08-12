import { Token } from "./token";

export interface ScanContext {
  previousToken?: Token;
  previousNonWhitespaceToken?: Token;

  peek(offset: number): number | -1;
}
