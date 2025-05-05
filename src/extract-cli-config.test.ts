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

		test("should treat the first argument as configPath and still detect --verbose when it is first", () => {
			process.argv.push("--verbose", "config.ts");

			const expected = {
				needsReportUnscoped: false,
				verbose: true,
				configPath: "--verbose",
			} satisfies ReturnType<typeof extractCliConfig>;

			const actual = extractCliConfig();
			expect(actual).toEqual(expected);
		});

		test("should treat the first argument as configPath and still detect --unscoped when it is first", () => {
			process.argv.push("--unscoped", "config.ts");

			const expected = {
				needsReportUnscoped: true,
				verbose: false,
				configPath: "--unscoped",
			} satisfies ReturnType<typeof extractCliConfig>;

			const actual = extractCliConfig();
			expect(actual).toEqual(expected);
		});
	});

	describe("Error Handling", () => {
		test("should throw error if no arguments are provided (config path is missing)", () => {
			expect(() => extractCliConfig()).toThrow("Configuration file not found");
		});

		test("should throw error if the first argument is an empty string", () => {
			process.argv.push("");
			expect(() => extractCliConfig()).toThrow("Configuration file not found");
		});
	});
});
