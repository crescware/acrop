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
	let spy: ReturnType<typeof vi.spyOn>;

	beforeEach(async () => {
		spy = vi.spyOn(console, "info").mockImplementation(() => {});
		process.argv.push("--unmatched-patterns", severity);
		success = await main();
	});

	afterEach(() => {
		spy.mockRestore();
	});

	test("should succeed (true)", () => {
		expect(success).toBe(true);
	});

	test("should NOT print 'unused pattern(s)' summary", () => {
		const printed = spy.mock.calls.some(
			([m]) =>
				typeof m === "string" &&
				m.startsWith("Found") &&
				m.includes("unused pattern"),
		);
		expect(printed).toBe(false);
	});
});
