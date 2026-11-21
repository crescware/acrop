import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI configuration and file discovery", () => {
	const { buildCli, removeBuild, runCli, runWithArgs } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	test("reports the invalid rule's config path and exits before scanning", () => {
		const result = runCli(
			'[{scope: "./src/*", rules: [{ allowed: 123 }]}]',
			{},
		);
		expect(result.status).toBe(1);
		expect(result.lines.join("\n")).toContain("default.scopes.0.rules.0");
		expect(result.lines).not.toContainEqual(
			expect.stringContaining("Files Checked"),
		);
		expect(result.lines.at(-1)).toBe("Exiting with code 1");
	});

	test("reports the requested path when the config file is missing", () => {
		const result = runWithArgs({}, [join("project", "acrop.config.ts")]);
		expect(result.status).toBe(1);
		expect(result.stderr).toContain(
			`Configuration file not found at: ${join(result.project, "acrop.config.ts")}`,
		);
		expect(result.lines).toEqual(["Exiting with code 1"]);
	});

	test("scans TSX from the config directory and respects its .gitignore", () => {
		const result = runCli(
			'[{ scope: "./src/**/*", rules: [{ restricted: ["./ui"], name: "UI boundary" }] }]',
			{
				".gitignore": "acrop.config.ts\nsrc/generated/\n",
				"src/page.tsx":
					"export const page = <div />;\r\nimport '../ui/button';",
				"src/generated/hidden.ts": "import '../../ui/button';",
				"outside.ts": "import './ui/button';",
			},
			["--unscoped"],
		);
		expectReport(result, 1, [
			"./src/page.tsx (1)",
			"2:8 ./ui/button UI boundary",
			"Unscoped Files (1)",
			"./outside.ts",
			"Files Checked 1 file (2 found, 1 unscoped)",
			"Restricted Imports 1 line",
		]);
	});

	const unusedScopes =
		'[{ scope: "./src/*", rules: [{ allowed: ["./unused"] }] }]';
	const summary = [
		"Files Checked 1 file (1 found, 0 unscoped)",
		"Restricted Imports 0 lines",
	];

	test("accepts --unmatched-patterns=<mode>", () => {
		const result = runCli(unusedScopes, { "src/a.ts": "" }, [
			"--unmatched-patterns=warn",
		]);
		expectReport(result, 0, [
			"Found 1 unused pattern(s) defined in rules:",
			"./src/* (1)",
			"rules[0] ./unused",
			...summary,
		]);
	});

	test("--verbose logs the timing of each step before the report", () => {
		const result = runCli(unusedScopes, { "src/a.ts": "" }, ["--verbose"]);
		const timing = (step: string) => {
			const escaped = step.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			return expect.stringMatching(
				new RegExp(`^${escaped}: \\d+(\\.\\d+)? ms$`),
			);
		};
		expect(result.stderr).toBe("");
		expect(result.status).toBe(0);
		expect(result.lines).toEqual([
			timing("Resolve config path"),
			"Import config",
			timing("> Transform config file"),
			timing("> Write js config file"),
			timing("Import config"),
			timing("Find TypeScript files"),
			"Check files",
			timing('> > "./src/a.ts" Match file'),
			timing('> "./src/*" Matched file in scope'),
			timing('> > "./src/a.ts" Make ast'),
			timing('> > "./src/a.ts" Find import paths'),
			timing("> > Analyze import access"),
			timing("Check files"),
			...summary,
			"Exiting with code 0",
		]);
	});
});
