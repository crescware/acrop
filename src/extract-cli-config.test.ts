import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { extractCliConfig } from "./extract-cli-config";

describe("extractCliConfig()", () => {
	let originalArgv: string[];

	beforeEach(() => {
		originalArgv = [...process.argv];
		process.argv = ["/usr/bin/node", "/path/to/script.js"];
	});

	afterEach(() => {
		process.argv = originalArgv;
	});

	test("should extract config path when only path is provided", () => {
		process.argv.push("path/to/config.ts");

		const expected = {
			needsReportUnscoped: false,
			verbose: false,
			configPath: "path/to/config.ts",
		} satisfies ReturnType<typeof extractCliConfig>;

		const actual = extractCliConfig();
		expect(actual).toEqual(expected);
	});

	describe("Flag Handling", () => {
		test("should detect --unscoped flag when it appears after config path", () => {
			process.argv.push("config.ts", "--unscoped");

			const expected = {
				needsReportUnscoped: true,
				verbose: false,
				configPath: "config.ts",
			} satisfies ReturnType<typeof extractCliConfig>;

			const actual = extractCliConfig();
			expect(actual).toEqual(expected);
		});

		test("should detect --verbose flag when it appears after config path", () => {
			process.argv.push("config.ts", "--verbose");

			const expected = {
				needsReportUnscoped: false,
				verbose: true,
				configPath: "config.ts",
			} satisfies ReturnType<typeof extractCliConfig>;

			const actual = extractCliConfig();
			expect(actual).toEqual(expected);
		});

		test("should detect both --unscoped and --verbose flags when they appear after config path", () => {
			process.argv.push("config.ts", "--verbose", "--unscoped");

			const expected = {
				needsReportUnscoped: true,
				verbose: true,
				configPath: "config.ts",
			} satisfies ReturnType<typeof extractCliConfig>;

			const actual = extractCliConfig();
			expect(actual).toEqual(expected);
		});

		test("should detect flags regardless of their order after config path", () => {
			process.argv.push("config.ts", "--unscoped", "--verbose");

			const expected = {
				needsReportUnscoped: true,
				verbose: true,
				configPath: "config.ts",
			} satisfies ReturnType<typeof extractCliConfig>;

			const actual = extractCliConfig();
			expect(actual).toEqual(expected);
		});

		test("should use the first non-flag argument as configPath when --verbose precedes it", () => {
			process.argv.push("--verbose", "config.ts");

			const expected = {
				needsReportUnscoped: false,
				verbose: true,
				configPath: "config.ts",
			} satisfies ReturnType<typeof extractCliConfig>;

			const actual = extractCliConfig();
			expect(actual).toEqual(expected);
		});

		test("should use the first non-flag argument as configPath when --unscoped precedes it", () => {
			process.argv.push("--unscoped", "config.ts");

			const expected = {
				needsReportUnscoped: true,
				verbose: false,
				configPath: "config.ts",
			} satisfies ReturnType<typeof extractCliConfig>;

			const actual = extractCliConfig();
			expect(actual).toEqual(expected);
		});
	});

	describe("Error Handling", () => {
		test("should throw an error when no arguments are provided", () => {
			expect(() => extractCliConfig()).toThrow("Configuration file not found");
		});

		test("should throw an error when the first argument is an empty string", () => {
			process.argv.push("");
			expect(() => extractCliConfig()).toThrow("Configuration file not found");
		});

		test("should throw an error when an unknown flag is supplied", () => {
			process.argv.push("config.ts", "--invalid");
			expect(() => extractCliConfig()).toThrow(/unknown or unexpected option/);
		});
	});
});
