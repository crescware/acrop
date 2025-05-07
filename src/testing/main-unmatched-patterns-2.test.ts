import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import type { config$ } from "../import-config/config";
import { outputFromTree } from "../log-reports";
import { type LogTree, gray, textLine } from "../log-tree";
import { blankLine, elem, space, underline } from "../log-tree/element-utils";
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
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ allowed: ["./a/**/*", "./b/**/*"] }],
		},
	],
};

setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [{ path: "a/a.ts", content: "" }],
});

describe("main()", () => {
	describe("unmatched-patterns 'warn'", () => {
		let success: boolean;

		beforeEach(async () => {
			process.argv.push("--unmatched-patterns", "warn");
			success = await main();
		});

		test("should return true", () => {
			expect(success).toEqual(true);
		});

		test("outputFromTree should be called with correct tree", () => {
			const expected = {
				nodes: [
					textLine([elem("Found 2 unused pattern(s) defined in rules:")]),
					blankLine(),
					textLine([gray(underline("./a/**/*")), space(), gray("(2)")]),
					{
						type: "table",
						alignment: ["left", "left"],
						rows: [
							[textLine([gray("rules[0]")]), textLine([elem("./a/**/*")])],
							[textLine([gray("rules[0]")]), textLine([elem("./b/**/*")])],
						],
					},

					{
						type: "table",
						alignment: ["right", "left"],
						rows: [
							expectFilesChecked("green", 1, 1, 0),
							expectRestrictedImports("green", 0),
							expectDuration("green"),
						],
					},
				],
			} satisfies LogTree;

			expect(vi.mocked(outputFromTree)).toHaveBeenCalledWith(expected);
		});
	});

	describe("unmatched-patterns 'error'", () => {
		let success: boolean;

		beforeEach(async () => {
			process.argv.push("--unmatched-patterns", "error");
			success = await main();
		});

		test("should return false", () => {
			expect(success).toEqual(false);
		});

		test("outputFromTree should be called with correct tree", () => {
			const expected = {
				nodes: [
					textLine([elem("Found 2 unused pattern(s) defined in rules:")]),
					blankLine(),
					textLine([gray(underline("./a/**/*")), space(), gray("(2)")]),
					{
						type: "table",
						alignment: ["left", "left"],
						rows: [
							[textLine([gray("rules[0]")]), textLine([elem("./a/**/*")])],
							[textLine([gray("rules[0]")]), textLine([elem("./b/**/*")])],
						],
					},
					textLine([
						elem(
							`Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.`,
						),
					]),
					blankLine(),
					{
						type: "table",
						alignment: ["right", "left"],
						rows: [
							expectFilesChecked("green", 1, 1, 0),
							expectRestrictedImports("green", 0),
							expectDuration("green"),
						],
					},
				],
			} satisfies LogTree;

			expect(vi.mocked(outputFromTree)).toHaveBeenCalledWith(expected);
		});
	});
});
