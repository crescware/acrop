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
		expect(treeArg?.nodes.at(-1)).toEqual({
			type: "table",
			alignment: ["right", "left"],
			rows: [
				// ✔ ファイル数／発見数／未スコープ数
				expectFilesChecked("yellow", 2, 2, 0),
				// ✔ 制限行
				expectRestrictedImports("yellow", 1),
				// ✔ 所要時間
				expectDuration("yellow"),
			],
		} as LogTree["nodes"][number]);
	});
});
