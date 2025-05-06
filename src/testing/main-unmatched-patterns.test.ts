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
			rules: [{ allowed: ["./a/**/*"] }, { allowed: ["./b/**/*"] }],
		},
	],
};

setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/a1.ts", content: `import { a2 } from "./a2"` },
		{ path: "a/a2.ts", content: `export const a2 = "a2";` },
	],
});

describe("main()", () => {
	describe("unmatched-patterns 'warn'", () => {
		let success: boolean;
		let spy: ReturnType<typeof vi.spyOn>;
		let logs: string[];

		beforeEach(async () => {
			logs = [];
			spy = vi
				.spyOn(console, "info")
				.mockImplementation((...args: unknown[]) => {
					logs.push(
						args
							.map((v) => (typeof v === "string" ? v : JSON.stringify(v)))
							.join(" "),
					);
				});

			process.argv.push("--unmatched-patterns", "warn");
			success = await main();
		});

		afterEach(() => {
			spy.mockRestore();
		});

		test("should return true", () => {
			expect(success).toBe(true);
		});

		test("should print correct summary line with exact count", () => {
			const expected = "Found 1 unused pattern(s) defined in rules:";
			expect(logs).toContain(expected);
		});

		test("should NOT print 'Failing build due to …' line", () => {
			const hasFailLine = logs.some((l) =>
				l.includes(
					'Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true"',
				),
			);
			expect(hasFailLine).toBe(false);
		});
	});

	describe("main() – unmatched-patterns 'error'", () => {
		let success: boolean;
		let spy: ReturnType<typeof vi.spyOn>;
		let logs: string[];

		beforeEach(async () => {
			logs = [];
			spy = vi
				.spyOn(console, "info")
				.mockImplementation((...args: unknown[]) => {
					logs.push(
						args
							.map((v) => (typeof v === "string" ? v : JSON.stringify(v)))
							.join(" "),
					);
				});

			process.argv.push("--unmatched-patterns", "error");
			success = await main();
		});

		afterEach(() => {
			spy.mockRestore();
		});

		test("should return false", () => {
			expect(success).toBe(false);
		});

		test("should print correct summary line with exact count", () => {
			const expected = "Found 1 unused pattern(s) defined in rules:";
			expect(logs).toContain(expected);
		});

		test("should print 'Failing build due to …' line", () => {
			const hasFailLine = logs.some((l) =>
				l.includes(
					'Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true"',
				),
			);
			expect(hasFailLine).toBe(true);
		});
	});
});
