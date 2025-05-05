import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { importConfig } from "../import-config";
import type { config$ } from "../import-config/config";
import { outputFromTree } from "../log-reports";
import type { LogTree } from "../log-tree";
import { main } from "../main";
import { setupMainTest } from "./test-utils";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));
vi.mock("../log-reports", () => ({ outputFromTree: vi.fn() }));

/*───────────────────── 期待ノードヘルパ ─────────────────────*/
const pathHeader = (path: string): LogTree["nodes"][number] => ({
	type: "text",
	elements: [
		{
			text: path,
			attributes: [
				{ type: "modifier", value: "underline" },
				{ type: "color", value: "gray" },
			],
		},
		{ text: " " },
		{ text: "(1)", attributes: [{ type: "color", value: "gray" }] },
	],
});

const violationTable = (
	loc: string,
	importPath: string,
	scopeLabel: string,
): LogTree["nodes"][number] => ({
	type: "table",
	alignment: ["left", "left", "left"],
	rows: [
		[
			{
				type: "text",
				elements: [
					{ text: loc, attributes: [{ type: "color", value: "gray" }] },
				],
			},
			{ type: "text", elements: [{ text: importPath }] },
			{
				type: "text",
				elements: [
					{ text: scopeLabel, attributes: [{ type: "color", value: "gray" }] },
				],
			},
		],
	],
});

const summaryTable = (
	checked: string,
	foundUnscoped: string,
	restricted: string,
): LogTree["nodes"][number] => ({
	type: "table",
	alignment: ["right", "left"],
	rows: [
		[
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
					{ text: checked, attributes: [{ type: "color", value: "yellow" }] },
					{ text: " " },
					{
						text: foundUnscoped,
						attributes: [{ type: "color", value: "gray" }],
					},
				],
			},
		],
		[
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
						text: restricted,
						attributes: [{ type: "color", value: "yellow" }],
					},
				],
			},
		],
		[
			{
				type: "text",
				elements: [
					{ text: "Duration", attributes: [{ type: "color", value: "gray" }] },
				],
			},
			{
				type: "text",
				elements: [
					{
						text: expect.stringMatching(/^\d+\.\d+ sec$/) as unknown as string,
						attributes: [{ type: "color", value: "yellow" }],
					},
				],
			},
		],
	],
});
/*───────────────────────────────────────────────────────────*/

const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [{ scope: "./a/**/*", rules: [{ restricted: ["./b/**/*"] }] }],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/a.ts", content: "import '../b/b';" }, // ← 制限違反
		{ path: "b/b.ts", content: "console.log('b');" },
	],
});

describe("main() – restricted import が存在する場合", () => {
	let success: boolean;

	beforeEach(async () => {
		success = await main();
	});

	test("should return false", () => {
		expect(success).toBe(false);
	});

	test("importConfig が正しいパスで呼ばれる", () => {
		expect(vi.mocked(importConfig)).toHaveBeenCalledWith(
			expect.anything(),
			configFilePathAbs,
		);
	});

	/* ★ LogTree 全体を検証する */
	test("LogTree 全体が期待どおり", () => {
		const expected: LogTree = {
			nodes: [
				pathHeader("./a/a.ts"),
				violationTable("1:8", "./b/b", "./a/**/*:rule[0]"),
				summaryTable("1 file", "(2 found, 1 unscoped)", "1 line"),
			],
		};
		expect(vi.mocked(outputFromTree)).toHaveBeenCalledWith(expected);
	});
});
