import type { AnalyzedResult } from "../check/analyze-import-access";
import { pathText } from "../path-utils";
import { elem, gray, textLine } from "./element-utils";
import type { TableNode } from "./log-tree";

export function buildNodeFromResults(
	analyzedResults: readonly AnalyzedResult[],
): TableNode | null {
	if (analyzedResults.length === 0) {
		return null;
	}

	const rows = analyzedResults.map((v) => {
		return [
			textLine([gray(`${v.line}:${v.column}`)]),
			textLine([elem(pathText(v.path))]),
			textLine([gray(v.scopeLabel)]),
		];
	});

	return {
		type: "table",
		rows,
		alignment: ["left", "left", "left"],
	} satisfies TableNode;
}
