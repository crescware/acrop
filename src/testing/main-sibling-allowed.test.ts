import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { importConfig } from "../import-config";
import type { config$ } from "../import-config/config";
import { outputFromTree } from "../log-reports";
import type { LogTree } from "../log-tree";
import { main } from "../main";
import {
	expectDuration,
	expectFilesChecked,
	expectRestrictedImports,
} from "./expect-utils";
import { setupMainTest } from "./test-utils";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));
vi.mock("../log-reports", () => ({ outputFromTree: vi.fn() }));

/* ── sibling: true ────────────────────────────────────── */
const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ sibling: true }],
		},
	],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/x.ts", content: "import './y';" }, // 兄弟 import （許可）
		{ path: "a/y.ts", content: "export {};" },
	],
});

describe("main() – sibling: true (兄弟 import を許可)", () => {
	let success: boolean;

	beforeEach(async () => {
		success = await main();
	});

	test("should return true", () => {
		expect(success).toBe(true);
	});

	test("importConfig が正しいパスで呼ばれる", () => {
		expect(vi.mocked(importConfig)).toHaveBeenCalledWith(
			expect.anything(),
			configFilePathAbs,
		);
	});

	test("Summary は green（制限行 0）", () => {
		const expected: LogTree = {
			nodes: [
				{
					type: "table",
					alignment: ["right", "left"],
					rows: [
						expectFilesChecked(2, 2, 0),
						expectRestrictedImports(0),
						expectDuration(),
					],
				},
			],
		};
		expect(vi.mocked(outputFromTree)).toHaveBeenCalledWith(expected);
	});
});
