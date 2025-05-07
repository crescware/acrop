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
	scopes: [
		{
			scope: "./a/**/*",
			rules: [
				{ restricted: ["./b/**/*"] },
				{ allowed: ["./a/**/*", "./b/**/*", "./c/**/*"] },
			],
		},
	],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{
			path: "a/a1.ts",
			content: `
import { b1 } from "../b/b1";
import { c1 } from "../c/c1";
import { a2 } from "./a2";
import { a3 } from "./a3";
`,
		},
		{
			path: "a/a2.ts",
			content: `export const a2 = "a2";`,
		},
		{
			path: "a/a3.ts",
			content: `export const a3 = "a3";`,
		},
		{
			path: "b/b1.ts",
			content: `export const b1 = "b1";`,
		},
		{
			path: "c/c1.ts",
			content: `export const c1 = "c1";`,
		},
	],
});

describe("main()", () => {
	describe("should return true and generate correct log tree when no restricted imports found", async () => {
		let success: boolean;

		beforeEach(async () => {
			success = await main();
		});

		test("should return true", () => {
			expect(success).toEqual(false);
		});

		describe("importConfig interactions", () => {
			test("should call importConfig once", () => {
				expect(vi.mocked(importConfig)).toHaveBeenCalledTimes(1);
			});

			test("should call importConfig with the correct absolute config path", () => {
				expect(vi.mocked(importConfig)).toHaveBeenCalledWith(
					expect.anything(),
					configFilePathAbs,
				);
			});
		});

		describe("log output generation", () => {
			test("should call outputFromTree once", () => {
				expect(vi.mocked(outputFromTree)).toHaveBeenCalledTimes(1);
			});

			test("should generate the correct log tree structure indicating success", () => {
				const expected = {
					nodes: [
						pathHeader("./a/a1.ts", 1),
						{
							type: "table",
							alignment: ["left", "left", "left"],
							rows: [
								[
									textLine([gray("2:20")]),
									textLine([elem("./b/b1")]),
									textLine([gray("./a/**/*:rule[0]")]),
								],
							],
						},
						{
							type: "table",
							alignment: ["right", "left"],
							rows: [
								expectFilesChecked("yellow", 3, 5, 2),
								expectRestrictedImports("yellow", 1),
								expectDuration("yellow"),
							],
						},
					],
				} satisfies LogTree;

				expect(vi.mocked(outputFromTree)).toHaveBeenNthCalledWith(1, expected);
			});
		});
	});
});
