import {
	gray,
	green,
	headerCell,
	plural,
	space,
	textLine,
	yellow,
} from "./element-utils";
import type { TableNode } from "./log-tree";

export function buildSummaryReportNode(
	tsFilesCount: number,
	scoped: Set<string>,
	duration: number,
	restrictedImports: number,
	unscopedFilesCount: number,
): TableNode {
	const colorize = restrictedImports === 0 ? green : yellow;

	const filesRow = [
		headerCell("Files Checked"),
		textLine([
			colorize([plural(scoped.size, "file")].join(" ")),
			space(),
			gray(`(${tsFilesCount} found, ${unscopedFilesCount} unscoped)`),
		]),
	] satisfies TableNode["rows"][number];

	const restrictedImportsRow = [
		headerCell("Restricted Imports"),
		textLine([colorize(plural(restrictedImports, "line"))]),
	] satisfies TableNode["rows"][number];

	const durationRow = [
		headerCell("Duration"),
		textLine([colorize(`${duration} sec`)]),
	] satisfies TableNode["rows"][number];

	return {
		type: "table",
		rows: [filesRow, restrictedImportsRow, durationRow],
		alignment: ["right", "left"],
	} satisfies TableNode;
}
