import { minimatch } from "minimatch";

import { pathText } from "../../path-utils";
import type { UnmatchedPatternsTracker } from "../../unmatched-pattern-tracker";
import type { Rule, calcRules } from "../calc-rules";
import type { findImportPaths } from "../find-import-paths";
import type { AnalyzedResult } from "./analyzed-result";

export function analyze(
	rulesResult: ReturnType<typeof calcRules>,
	info: ReturnType<typeof findImportPaths>[number],
	trackerRef: UnmatchedPatternsTracker,
): AnalyzedResult {
	let isAllowed = false;
	let matchedRule: Rule | null = null;

	for (const rule of rulesResult.rules) {
		const matched = minimatch(pathText(info.path), rule.pattern);
		if (!matched) {
			continue;
		}

		matchedRule = rule;
		trackerRef.markAsMatched(matchedRule);
		isAllowed = rule.type === "allowed";

		break;
	}

	if (matchedRule === null) {
		const external = info.path.type === "external";
		if (external && !rulesResult.hasExternalRule) {
			isAllowed = true;
		}
	}

	return {
		path: info.path,
		isAllowed,
		line: info.line,
		column: info.column,
		scopeLabel: matchedRule?.scopeLabel ?? rulesResult.scope,
	};
}
