import type { StrictExtract } from "ts-essentials";
import { expect } from "vitest";

import type { LogTree } from "../log-tree";

type Row = StrictExtract<
	LogTree["nodes"][number],
	{ type: "table" }
>["rows"][number];

export function expectFilesChecked(
	checked: number,
	found: number,
	unscoped: number,
): Row {
	return [
		{
			type: "text",
			elements: [
				{
					text: "Files Checked",
					attributes: [{ type: "color", value: "gray" }],
				},
			],
		},
		{
			type: "text",
			elements: [
				{
					text: `${checked} ${checked === 1 ? "file" : "files"}`,
					attributes: [{ type: "color", value: "green" }],
				},
				{ text: " " },
				{
					text: `(${found} found, ${unscoped} unscoped)`,
					attributes: [{ type: "color", value: "gray" }],
				},
			],
		},
	];
}

export function expectRestrictedImports(lines: number): Row {
	return [
		{
			type: "text",
			elements: [
				{
					text: "Restricted Imports",
					attributes: [{ type: "color", value: "gray" }],
				},
			],
		},
		{
			type: "text",
			elements: [
				{
					text: `${lines} ${lines === 1 ? "line" : "lines"}`,
					attributes: [{ type: "color", value: "green" }],
				},
			],
		},
	] as Row;
}

export function expectDuration(): Row {
	return [
		{
			type: "text",
			elements: [
				{
					text: "Duration",
					attributes: [{ type: "color", value: "gray" }],
				},
			],
		},
		{
			type: "text",
			elements: [
				{
					text: expect.stringMatching(/^\d+\.\d+ sec$/),
					attributes: [{ type: "color", value: "green" }],
				},
			],
		},
	];
}
