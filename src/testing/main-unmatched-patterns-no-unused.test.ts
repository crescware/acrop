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
	scopes: [
		{
			scope: "./a/**/*",
			rules: [{ allowed: [] }],
		},
	],
};

setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [{ path: "a/a.ts", content: `console.log("hello")` }],
});

describe.each([
	{ severity: "off" as const },
	{ severity: "warn" as const },
	{ severity: "error" as const },
])("main() – unmatched-patterns '%s' (no unused)", ({ severity }) => {
	let success: boolean;

	beforeEach(async () => {
		process.argv.push("--unmatched-patterns", severity);
		success = await main();
	});

	test("should succeed (true)", () => {
		expect(success).toEqual(true);
	});

	test("outputFromTree should be called with correct summary (no unmatched report)", () => {
		const expectedSummaryTable: LogTree["nodes"][number] = {
			type: "table",
			alignment: ["right", "left"],
			rows: [
				expectFilesChecked("green", 1, 1, 0),
				expectRestrictedImports("green", 0),
				expectDuration("green"),
			],
		};

		const expected: LogTree = {
			nodes: [expectedSummaryTable],
		};

		expect(vi.mocked(outputFromTree)).toHaveBeenCalledWith(expected);
	});
});
