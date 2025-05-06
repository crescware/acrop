// src/testing/main-ast-syntax-error.test.ts
import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

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
	scopes: [{ scope: "./**/*", rules: [{ allowed: ["./**/*"] }] }],
};

setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		// わざと構文エラー
		{ path: "a/bad.ts", content: "import" },
	],
});

describe("main() – syntax error file present", () => {
	let success: boolean;

	beforeEach(async () => {
		success = await main();
	});

	test("should succeed (true) even with parser errors", () => {
		expect(success).toBe(true);
	});

	test("outputFromTree should contain the exact expected tree", () => {
		const expected = {
			nodes: [
				{
					type: "text",
					elements: [
						{
							text: expect.stringContaining("a/bad.ts"),
							attributes: [{ type: "color", value: "red" }],
						},
					],
					// biome-ignore lint/suspicious/noExplicitAny:
					children: expect.any(Array) as any,
				},
				{
					type: "table",
					alignment: ["right", "left"],
					rows: [
						expectFilesChecked("green", 0, 1, 1),
						expectRestrictedImports("green", 0),
						expectDuration("green"),
					],
				},
			],
		} satisfies LogTree;

		expect(vi.mocked(outputFromTree)).toHaveBeenNthCalledWith(1, expected);
	});
});
