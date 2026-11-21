import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("unused patterns in scopes with no checked files", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	test.each(["warn", "error"])("reports static patterns in %s mode", (mode) => {
		const scopes = `[{ scope: "./absent/*", rules: [
			{ allowed: ["./public"] }, { restricted: ["./private/**/*"] },
			{ allowed: () => { throw Error("no importer"); } }, { sibling: true }
		] }]`;
		const result = runCli(scopes, {}, ["--unmatched-patterns", mode]);
		expectReport(result, mode === "error" ? 1 : 0, [
			"Found 2 unused pattern(s) defined in rules:",
			"./absent/* (2)",
			"rules[0] ./public",
			"rules[1] ./private/**/*",
			...(mode === "error"
				? [
						'Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.',
					]
				: []),
			"Files Checked 0 files (0 found, 0 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("an earlier identical scope cannot consume a later scope's patterns", () => {
		const scope = { scope: "./src/*", rules: [{ allowed: ["./lib"] }] };
		const result = runCli(
			JSON.stringify([scope, scope]),
			{ "src/a.ts": "import '../lib';" },
			["--unmatched-patterns", "warn"],
		);
		expectReport(result, 0, [
			"Found 1 unused pattern(s) defined in rules:",
			"./src/* (1)",
			"rules[0] ./lib",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("excludes scopes disabled by only from unused-pattern reporting", () => {
		const result = runCli(
			`[
			{scope:"./disabled/*", rules:[{restricted:["./ignored"]}]},
			{scope:"./active/*", only:true, rules:[]}
		]`,
			{ "active/a.ts": "" },
			["--unscoped", "--unmatched-patterns", "error"],
		);
		expectReport(result, 1, [
			'Found 1 scope(s) with "only: true", processing only these scopes',
			"Unscoped Files (0)",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 0 lines",
			'Failed due to "only: true" flag',
		]);
	});
});
