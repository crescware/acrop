import type { StrictExtract } from "ts-essentials";
import { expect } from "vitest";

import {
	type LogTree,
	gray,
	green,
	headerCell,
	space,
	textLine,
} from "../log-tree";
import {
	blankLine,
	elem,
	plural,
	underline,
	yellow,
} from "../log-tree/element-utils";

type Row = StrictExtract<
	LogTree["nodes"][number],
	{ type: "table" }
>["rows"][number];

export function expectFilesChecked(
	color: "green" | "yellow",
	checked: number,
	found: number,
	unscoped: number,
): Row {
	const colorize = color === "green" ? green : yellow;

	return [
		headerCell("Files Checked"),
		textLine([
			colorize([plural(checked, "file")].join(" ")),
			space(),
			gray(`(${found} found, ${unscoped} unscoped)`),
		]),
	];
}

export function expectRestrictedImports(
	color: "green" | "yellow",
	lines: number,
): Row {
	const colorize = color === "green" ? green : yellow;

	return [
		headerCell("Restricted Imports"),
		textLine([colorize(plural(lines, "line"))]),
	];
}

export function expectDuration(color: "green" | "yellow"): Row {
	return [
		headerCell("Duration"),
		textLine([
			{
				text: expect.stringMatching(/^\d+\.\d+ sec$/),
				attributes: [{ type: "color", value: color }],
			},
		]),
	];
}

export function pathHeader(path: string): LogTree["nodes"][number] {
	return textLine([gray(underline(path)), space(), gray("(1)")]);
}

export function expectUnscopedFiles(files: string[]): LogTree["nodes"] {
	return [
		textLine([underline("Unscoped Files"), space(), gray(`(${files.length})`)]),
		blankLine(),
		...files.map((f) => textLine([elem(f)])),
		blankLine(),
	];
}
