import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { importConfig } from "../import-config";
import type { config$ } from "../import-config/config";
import { outputFromTree } from "../log-reports";
import { type LogTree, gray, textLine } from "../log-tree";
import { elem } from "../log-tree/element-utils";
import { main } from "../main";
import {
	expectDuration,
	expectFilesChecked,
	expectRestrictedImports,
	pathHeader,
} from "./expect-utils";
import { setupMainTest } from "./test-utils";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));
vi.mock("../log-reports", () => ({ outputFromTree: vi.fn() }));

const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [{ scope: "./a/**/*", rules: [{ restricted: ["./b/**/*"] }] }],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/a.ts", content: "import '../b/b';" },
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

	test("LogTree 全体が期待どおり", () => {
		const expected = {
			nodes: [
				pathHeader("./a/a.ts"),
				{
					type: "table",
					alignment: ["left", "left", "left"],
					rows: [
						[
							textLine([gray("1:8")]),
							textLine([elem("./b/b")]),
							textLine([gray("./a/**/*:rule[0]")]),
						],
					],
				},
				{
					type: "table",
					alignment: ["right", "left"],
					rows: [
						expectFilesChecked("yellow", 1, 2, 1),
						expectRestrictedImports("yellow", 1),
						expectDuration("yellow"),
					],
				},
			],
		} satisfies LogTree;

		expect(vi.mocked(outputFromTree)).toHaveBeenCalledWith(expected);
	});
});
