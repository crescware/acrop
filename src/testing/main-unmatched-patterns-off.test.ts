import type { InferOutput } from "valibot";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

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
				{ allowed: ["./unused/**/*"] }, // ← 未使用パターン
			],
		},
	],
};

setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [{ path: "a/a.ts", content: "" }],
});

describe("main() – '--unmatched-patterns off'", () => {
	let success: boolean;
	let spy: ReturnType<typeof vi.spyOn>;

	beforeEach(async () => {
		spy = vi.spyOn(console, "info").mockImplementation(() => {
			/* silent */
		});
		process.argv.push("--unmatched-patterns", "off");
		success = await main();
	});

	afterEach(() => {
		spy.mockRestore();
	});

	test("should succeed (true)", () => {
		expect(success).toBe(true);
	});

	test("should NOT print 'unused pattern(s)' summary", () => {
		const printedUnused = spy.mock.calls.some(
			([msg]) =>
				typeof msg === "string" &&
				msg.startsWith("Found") &&
				msg.includes("unused pattern"),
		);
		expect(printedUnused).toBe(false);
	});
});
