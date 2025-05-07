import type { ErrorReport } from "../check/error-report";
import { elem, red, textLine } from "./element-utils";
import type { TextNode } from "./log-tree";

export function buildNodesFromErrors(
	reports: readonly ErrorReport[],
): readonly TextNode[] {
	return reports.map((report): TextNode => {
		return {
			type: "text",
			elements: [red(report.path)],
			children: report.errors.map((v): TextNode => textLine([elem(v)])),
		};
	});
}
