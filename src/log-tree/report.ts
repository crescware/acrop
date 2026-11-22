import type { AnalyzedResult } from "../check/analyze-import-access";

export type Report = Readonly<{
	path: Readonly<{
		relative: string;
		absolute: string;
	}>;
	result: readonly AnalyzedResult[];
}>;
