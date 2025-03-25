import { minimatch } from "minimatch";

import type { calcRules } from "../calc-rules";
import type { findImportPaths } from "../find-import-paths";
import type { AnalyzedResult } from "./analyzed-result";

export function analyze(
	rules: ReturnType<typeof calcRules>,
	info: ReturnType<typeof findImportPaths>[number],
): AnalyzedResult {
	let isAllowed = false;

	for (const rule of rules) {
		const matched = minimatch(info.path.relative, rule.pattern);
		if (!matched) {
			continue;
		}
		isAllowed = rule.type === "allowed";
		break;
	}

	return {
		path: info.path,
		isAllowed,
		line: info.line,
		column: info.column,
	};
}
