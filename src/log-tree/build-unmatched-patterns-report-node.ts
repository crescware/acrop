import type { UnmatchedPatternsFlags } from "../extract-cli-config/unmatched-patterns-flags";
import type { PatternInfo } from "../unmatched-pattern-tracker";
import { blankLine, elem, textLine } from "./element-utils";
import type { LogNode } from "./log-tree";

export function buildUnmatchedPatternsReportNode(
	unmatchedPatterns: readonly PatternInfo[],
	cliFlags: UnmatchedPatternsFlags,
): readonly LogNode[] {
	if (!cliFlags.needsCheck || unmatchedPatterns.length === 0) {
		return [];
	}

	const nodes: LogNode[] = [];

	nodes.push(blankLine()); // Add a blank line before the report

	nodes.push(
		textLine([
			elem(
				`Found ${unmatchedPatterns.length} unused pattern(s) defined in rules:`,
			),
		]),
	);

	for (const p of unmatchedPatterns) {
		nodes.push(
			textLine([
				elem(
					`  - ${p.scopeLabel} (rule[${p.ruleIndex.toString()}]): ${p.pattern}`,
				),
			]),
		);
	}

	nodes.push(blankLine()); // Add a blank line after the list

	if (cliFlags.shouldFail) {
		nodes.push(
			textLine([
				elem(
					`Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.`,
				),
			]),
		);
		nodes.push(blankLine()); // Add a blank line after the fail message
	}

	return nodes;
}
