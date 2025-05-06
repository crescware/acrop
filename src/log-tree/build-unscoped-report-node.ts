import {
	blankLine,
	elem,
	gray,
	space,
	textLine,
	underline,
} from "./element-utils";
import type { TextNode } from "./log-tree";

type UnscopedFiles = readonly Readonly<{
	relative: string;
	absolute: string;
}>[];

export function buildUnscopedReportNode(
	needsReportUnscoped: boolean,
	unscopedFilesCount: number,
	unscopedFiles: UnscopedFiles,
): readonly TextNode[] {
	if (!needsReportUnscoped) {
		return [];
	}

	return [
		textLine([
			underline("Unscoped Files"),
			space(),
			gray(`(${unscopedFilesCount})`),
		]),
		blankLine(),
		...unscopedFiles.map((v) => textLine([elem(v.relative)])),
		blankLine(),
	] satisfies readonly TextNode[];
}
