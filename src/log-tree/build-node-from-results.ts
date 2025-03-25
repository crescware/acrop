import type { AnalyzedResult } from "../check/analyze-import-access";
import type { TableNode } from "./log-tree";

export function buildNodeFromResults(
	analyzedResults: readonly AnalyzedResult[],
): TableNode | null {
	if (analyzedResults.length === 0) {
		return null;
	}

	return {
		type: "table",
		rows: analyzedResults.map((v) => {
			return [
				{
					type: "text",
					elements: [
						{
							text: [v.line, v.column].join(":"),
							attributes: [{ type: "color", value: "gray" }],
						},
					],
				},
				{ type: "text", elements: [{ text: v.path.relative }] },
			];
		}),
		alignment: ["left", "left"],
	} satisfies TableNode;
}
