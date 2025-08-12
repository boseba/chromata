import { Match, MatchInput } from "./matcher";

export type MatcherFunction = (input: MatchInput) => Match | null;
