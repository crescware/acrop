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
			rules: [{ allowed: ["./b/**/*", "lodash"] }],
		},
	],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{
			path: "a/a.tsx",
			content: `
import { useEffect } from "react";
import "../b/b";
            `,
		},
		{
			path: "b/b.ts",
			content: `console.log("b");`,
		},
	],
});

describe("main()", () => {
	describe("should return true and generate correct log tree when no restricted imports found", () => {
		let success: boolean;

		beforeEach(async () => {
			success = await main();
		});

		test("should return false", () => {
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

			test("should generate the correct log tree structure indicating failure", () => {
				const expected = {
					nodes: [
						pathHeader("./a/a.tsx", 1),
						{
							type: "table",
							alignment: ["left", "left", "left"],
							rows: [
								[
									textLine([gray("2:27")]),
									textLine([elem("react")]),
									textLine([gray("./a/**/*")]),
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

				expect(vi.mocked(outputFromTree)).toHaveBeenNthCalledWith(1, expected);
			});
		});
	});
});
