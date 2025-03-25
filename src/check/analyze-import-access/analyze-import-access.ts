import type { VerboseLogger } from "../../verbose-logger";
import { analyze } from "./analyze";
import type { AnalyzedResult } from "./analyzed-result";

export function analyzeImportAccess(
	logger: VerboseLogger,
	rules: Parameters<typeof analyze>[0],
	infoArray: readonly Parameters<typeof analyze>[1][],
): readonly AnalyzedResult[] {
	const end = logger.start("> > Analyze import access");
	const ret = infoArray.map((v): AnalyzedResult => analyze(rules, v));
	end();
	return ret;
}
