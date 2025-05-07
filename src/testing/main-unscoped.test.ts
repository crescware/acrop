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
	expectUnscopedFiles,
} from "./expect-utils";
import { setupMainTest } from "./test-utils";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));
vi.mock("../log-reports", () => ({ outputFromTree: vi.fn() }));

const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [{ scope: "./a/**/*", rules: [{ allowed: ["./a/**/*"] }] }],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/a.ts", content: "" },
		{ path: "b/b.ts", content: "" },
	],
});

describe("main() – --unscoped フラグがある場合", () => {
	let success: boolean;

	beforeEach(async () => {
		process.argv.push("--unscoped");
		success = await main();
	});

	test("should return true", () => {
		expect(success).toEqual(true);
	});

	test("importConfig が正しいパスで呼ばれる", () => {
		expect(vi.mocked(importConfig)).toHaveBeenCalledWith(
			expect.anything(),
			configFilePathAbs,
		);
	});

	test("Summary は green（unscoped = 1）", () => {
		const expected = {
			nodes: [
				...expectUnscopedFiles(["./b/b.ts"]),
				{
					type: "table",
					alignment: ["right", "left"],
					rows: [
						expectFilesChecked("green", 1, 2, 1),
						expectRestrictedImports("green", 0),
						expectDuration("green"),
					],
				},
			],
		} satisfies LogTree;

		expect(vi.mocked(outputFromTree)).toHaveBeenCalledWith(expected);
	});
});
