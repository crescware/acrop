import type { RestrictedResult } from "../check/analyze-import-access";
import { elem, gray, textLine } from "./element-utils";
import type { TableNode } from "./log-tree";

export function buildNodeFromResults(
	restrictedResults: readonly RestrictedResult[],
): TableNode | null {
	if (restrictedResults.length === 0) {
		return null;
	}

	const rows = restrictedResults.map((v) => {
		return [
			textLine([gray(`${v.line}:${v.column}`)]),
			textLine([elem(v.path.relative)]),
			textLine([gray(v.scopeLabel)]),
		];
	});

	return {
		type: "table",
		rows,
		alignment: ["left", "left", "left"],
	} satisfies TableNode;
}
