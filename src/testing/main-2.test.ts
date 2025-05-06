import {} from "node:fs/promises";
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
	scopes: [],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/a.ts", content: "import '../b/b';" },
		{ path: "b/b.ts", content: "console.log('b');" },
	],
});

describe("main()", () => {
	describe("should return true and generate correct log tree when no restricted imports found", async () => {
		let success: boolean;

		beforeEach(async () => {
			success = await main();
		});

		test("should return true", () => {
			expect(success).toBe(true);
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
						{
							type: "table",
							alignment: ["right", "left"],
							rows: [
								expectFilesChecked("green", 0, 2, 2),
								expectRestrictedImports("green", 0),
								expectDuration("green"),
							],
						},
					],
				} satisfies LogTree;

				expect(vi.mocked(outputFromTree)).toHaveBeenNthCalledWith(1, expected);
			});
		});
	});
});
