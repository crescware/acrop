import { assertExists } from "../exists";
import type { UnmatchedPatternsFlags } from "../extract-cli-config/unmatched-patterns-flags";
import type { PatternInfo } from "../unmatched-pattern-tracker";
import {
	blankLine,
	elem,
	gray,
	space,
	textLine,
	underline,
} from "./element-utils";
import type { LogNode, TableNode } from "./log-tree";

export function buildUnmatchedPatternsReportNode(
	unmatchedPatterns: readonly PatternInfo[],
	cliFlags: UnmatchedPatternsFlags,
): readonly LogNode[] {
	if (!cliFlags.needsCheck || unmatchedPatterns.length === 0) {
		return [];
	}

	const nodes: LogNode[] = [];

	nodes.push(
		textLine([
			elem(
				`Found ${unmatchedPatterns.length} unused pattern(s) defined in rules:`,
			),
		]),
	);
	nodes.push(blankLine());

	const groupedPatterns = new Map<string, PatternInfo[]>();
	for (const p of unmatchedPatterns) {
		if (!groupedPatterns.has(p.scopeName)) {
			groupedPatterns.set(p.scopeName, []);
		}
		const patterns = groupedPatterns.get(p.scopeName);
		assertExists(patterns);
		patterns.push(p);
	}

	for (const [scopeName, patternsInScope] of groupedPatterns.entries()) {
		nodes.push(
			textLine([
				gray(underline(scopeName)),
				space(),
				gray(`(${patternsInScope.length})`),
			]),
		);

		const tableRows = patternsInScope.map((p) => [
			textLine([gray(`rules[${p.ruleIndex.toString()}]`)]),
			textLine([elem(p.pattern)]),
		]);

		nodes.push({
			type: "table",
			rows: tableRows,
			alignment: ["left", "left"],
		} satisfies TableNode);
	}

	if (cliFlags.shouldFail) {
		nodes.push(
			textLine([
				elem(
					`Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.`,
				),
			]),
		);
		nodes.push(blankLine());
	}

	return nodes;
}
