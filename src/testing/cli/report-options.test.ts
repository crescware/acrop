import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI report options", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	const outcomes = [
		{ restricted: false, unused: false },
		{ restricted: true, unused: false },
		{ restricted: false, unused: true },
		{ restricted: true, unused: true },
	];
	const cases = [];
	for (const mode of ["omitted", "off", "warn", "error"]) {
		for (const unscoped of [false, true]) {
			for (const only of [false, true]) {
				for (const outcome of outcomes) {
					cases.push({ mode, unscoped, only, ...outcome });
				}
			}
		}
	}

	test.each(cases)(
		"mode=$mode, unscoped=$unscoped, only=$only, restricted=$restricted, unused=$unused",
		({ mode, unscoped, only, restricted, unused }) => {
			const flags = unscoped ? ["--unscoped"] : [];
			if (mode !== "omitted") {
				flags.push("--unmatched-patterns", mode);
			}

			const rules = [
				restricted
					? { restricted: ["./lib"], name: "block lib" }
					: { allowed: ["./lib"] },
			];
			if (unused) {
				rules.push({ allowed: ["./unused"] });
			}
			const result = runCli(
				JSON.stringify([{ scope: "./src/*", only, rules }]),
				{
					"src/a.ts": "import '../lib/x';",
					"outside.ts": "",
				},
				flags,
			);

			const expected: string[] = [];
			if (only) {
				expected.push(
					'Found 1 scope(s) with "only: true", processing only these scopes',
				);
			}
			if (restricted) {
				expected.push("./src/a.ts (1)", "1:8 ./lib/x block lib");
			}
			if (unscoped) {
				expected.push("Unscoped Files (1)", "./outside.ts");
			}
			if (unused && (mode === "warn" || mode === "error")) {
				expected.push(
					"Found 1 unused pattern(s) defined in rules:",
					"./src/* (1)",
					"rules[1] ./unused",
				);
			}
			const unusedError = unused && mode === "error";
			if (unusedError) {
				expected.push(
					'Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.',
				);
			}
			expected.push(
				"Files Checked 1 file (2 found, 1 unscoped)",
				restricted ? "Restricted Imports 1 line" : "Restricted Imports 0 lines",
			);
			if (only) {
				expected.push('Failed due to "only: true" flag');
			}
			expectReport(result, restricted || unusedError || only ? 1 : 0, expected);
		},
	);
});
