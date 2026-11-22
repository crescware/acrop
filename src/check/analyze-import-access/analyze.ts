import { matchesPattern } from "../../pattern/matches-pattern";
import type { UnmatchedPatternsTracker } from "../../unmatched-pattern-tracker";
import type { Rule, calcRules } from "../calc-rules";
import type { findImportPaths } from "../find-import-paths";
import type { makeLocator } from "../make-locator";
import type { AnalyzedResult } from "./analyzed-result";

export function analyze(
	rulesResult: ReturnType<typeof calcRules>,
	info: ReturnType<typeof findImportPaths>[number],
	trackerRef: UnmatchedPatternsTracker,
	locate: ReturnType<typeof makeLocator>,
): AnalyzedResult {
	let isAllowed = false;
	let matchedRule: Rule | null = null;

	for (const rule of rulesResult.rules) {
		const matched = matchesPattern(info.path.relative, rule.pattern);
		if (!matched) {
			continue;
		}

		matchedRule = rule;
		trackerRef.markAsMatched(matchedRule);
		isAllowed = rule.type === "allowed";

		break;
	}

	const scopeLabel = matchedRule?.scopeLabel ?? rulesResult.scope;

	if (isAllowed) {
		return { path: info.path, isAllowed, scopeLabel };
	}

	const { line, column } = locate(info.start);
	return { path: info.path, line, column, isAllowed, scopeLabel };
}
