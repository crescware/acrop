import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { importConfig } from "../import-config";
import type { config$ } from "../import-config/config";
import { outputFromTree } from "../log-reports";
import { main } from "../main";
import { setupMainTest } from "./test-utils";

// ── モック ───────────────────────────────────
vi.mock("../import-config", () => ({ importConfig: vi.fn() }));
vi.mock("../log-reports", () => ({ outputFromTree: vi.fn() }));
// ────────────────────────────────────────────

// ★ 期待行を動的に作るヘルパ（yellow）
function yellowSummaryRow(
	header: string,
	mainText: string,
	grayTail?: string | RegExp,
) {
	return [
		{
			type: "text",
			elements: [
				{ text: header, attributes: [{ type: "color", value: "gray" }] },
			],
		},
		{
			type: "text",
			elements: [
				{ text: mainText, attributes: [{ type: "color", value: "yellow" }] },
				...(grayTail
					? [
							{ text: " " },
							{
								text: grayTail as unknown as string,
								attributes: [{ type: "color", value: "gray" }],
							},
						]
					: []),
			],
		},
	] as const;
}

const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [{ scope: "./a/**/*", rules: [{ sibling: false }] }],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/x.ts", content: "import './y';" }, // 兄弟 import （禁止）
		{ path: "a/y.ts", content: "export {};" },
	],
});

describe("main() – sibling: false (兄弟 import を禁止)", () => {
	let success: boolean;

	beforeEach(async () => {
		success = await main();
	});

	test("should return false (制限行があるため失敗)", () => {
		expect(success).toBe(false);
	});

	test("importConfig が正しいパスで呼ばれる", () => {
		expect(vi.mocked(importConfig)).toHaveBeenCalledWith(
			expect.anything(),
			configFilePathAbs,
		);
	});

	test("Summary は yellow（制限行 1）", () => {
		const treeArg = vi.mocked(outputFromTree).mock.calls[0]?.[0];
		const summaryRows = treeArg?.nodes.at(-1)?.rows;

		expect(summaryRows).toEqual([
			yellowSummaryRow("Files Checked", "2 files", "(2 found, 0 unscoped)"),
			yellowSummaryRow("Restricted Imports", "1 line"),
			yellowSummaryRow(
				"Duration",
				expect.stringMatching(/^\d+\.\d+ sec$/) as unknown as string,
			),
		]);
	});
});
