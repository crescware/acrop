import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import type { config$ } from "../import-config/config";
import { main } from "../main";
import { setupMainTest } from "./test-utils";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));

const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			rules: [
				{ allowed: ["./a/**/*"] },
				{ allowed: ["./unused/**/*"] }, // ← マッチしないパターン
			],
		},
	],
};

setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [{ path: "a/a.ts", content: "" }],
});

describe.each([
	{ severity: "warn", expectSuccess: true },
	{ severity: "error", expectSuccess: false },
] as const)(
	"main() – unmatched-patterns: $severity",
	({ severity, expectSuccess }) => {
		let success: boolean;
		beforeEach(async () => {
			process.argv.push("--unmatched-patterns", severity);
			success = await main();
		});

		test(`should return ${expectSuccess}`, () => {
			expect(success).toBe(expectSuccess);
		});
	},
);
