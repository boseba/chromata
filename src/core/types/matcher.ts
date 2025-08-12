import { ScanContext } from "./scan-context";

export interface Matcher {
  name: string;
  classes: string[];

  match(input: MatchInput): Match | null;
}

export interface Match {
  length: number;
  classes?: string[];
}

export interface MatchInput {
  code: string;
  index: number;
  context: ScanContext;
}
