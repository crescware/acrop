import type { Path } from "../../path-utils";

export type AnalyzedResult = Readonly<{
	path: Path;
	line: number;
	column: number;
	isAllowed: boolean;
	scopeLabel: string;
}>;
