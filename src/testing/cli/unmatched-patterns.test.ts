import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI unused patterns in different scopes", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	function checkPatterns(secondName: string) {
		const scopes = ["a", "b"].map((dir) => ({
			scope: `./${dir}/*`,
			rules: [
				{ allowed: ["./lib"], name: dir === "a" ? "shared" : secondName },
			],
		}));
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

	// Known defect: identical rule names currently share their matched state across scopes.
	test.fails("keeps the unused pattern when both rules have the same name", () => {
		expectUnusedInSecondScope(checkPatterns("shared"));
	});
});
