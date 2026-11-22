import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI unused patterns in different scopes", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	function checkPatterns(secondName: string) {
		const scopes = [
			{ scope: "./a/*", rules: [{ allowed: ["./lib"], name: "shared" }] },
			{ scope: "./b/*", rules: [{ allowed: ["./lib"], name: secondName }] },
		];
		return runCli(
			JSON.stringify(scopes),
			{ "a/file.ts": "import '../lib/x';", "b/file.ts": "export {};" },
			["--unmatched-patterns", "error"],
		);
	}

	function expectUnusedInSecondScope(result: ReturnType<typeof runCli>) {
		expectReport(result, 1, [
			"Found 1 unused pattern(s) defined in rules:",
			"./b/* (1)",
			"rules[0] ./lib",
			'Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.',
			"Files Checked 2 files (2 found, 0 unscoped)",
			"Restricted Imports 0 lines",
		]);
	}

	test("attributes the unused rule to the second scope", () => {
		expectUnusedInSecondScope(checkPatterns("other"));
	});

	test("keeps the unused pattern when both rules have the same name", () => {
		expectUnusedInSecondScope(checkPatterns("shared"));
	});

	test("reports generated and static unused patterns in rule order", () => {
		const result = runCli(
			`[{scope:"./src/*", rules: [
			{restricted: (file: string) => [file.replace(".ts", ".internal")]},
			{allowed: ["./used", "./unused"]},
		]}]`,
			{ "src/a.ts": "import '../used/x';" },
			["--unmatched-patterns", "warn"],
		);
		expectReport(result, 0, [
			"Found 2 unused pattern(s) defined in rules:",
			"./src/* (2)",
			"rules[0] ./src/a.internal",
			"rules[1] ./unused",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("reports a pattern that an earlier rule shadows", () => {
		const result = runCli(
			'[{scope:"./src/*", rules: [{restricted: ["./ui"]}, {allowed: ["./ui"]}]}]',
			{ "src/a.ts": "import '../ui/x';" },
			["--unmatched-patterns", "warn"],
		);
		expectReport(result, 1, [
			"./src/a.ts (1)",
			"1:8 ./ui/x ./src/*:rule[0]",
			"Found 1 unused pattern(s) defined in rules:",
			"./src/* (1)",
			"rules[1] ./ui",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 1 line",
		]);
	});

	test("reports the sibling pattern of each directory without a sibling import", () => {
		const result = runCli(
			'[{scope:"./src/**/*", rules: [{sibling: true}, {allowed: ["./lib"]}]}]',
			{
				"src/x/a.ts": "import './b';",
				"src/y/a.ts": "import '../../lib';",
			},
			["--unmatched-patterns", "warn"],
		);
		expectReport(result, 0, [
			"Found 1 unused pattern(s) defined in rules:",
			"./src/**/* (1)",
			"rules[0] ./src/y/**/*",
			"Files Checked 2 files (2 found, 0 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});
});
