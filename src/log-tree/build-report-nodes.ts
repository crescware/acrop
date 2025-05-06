import { buildNodeFromResults } from "./build-node-from-results";
import { gray, space, textLine, underline } from "./element-utils";
import type { LogNode } from "./log-tree";
import type { Report } from "./report";

export function buildReportNodes(
	reports: readonly Report[],
): readonly LogNode[] {
	return reports.flatMap(({ path, result }): readonly LogNode[] => {
		const restricted = result.filter((v) => !v.isAllowed);

		const textNode = textLine([
			gray(underline(path.relative)),
			space(),
			gray(`(${restricted.length})`),
		]);

		const tableNode = buildNodeFromResults(restricted);
		return tableNode === null ? [] : [textNode, tableNode];
	});
}
