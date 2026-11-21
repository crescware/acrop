import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI report options", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	const files = { "src/a.ts": "import '../lib/x';", "outside.ts": "" };
	const allowed = { allowed: ["./lib"] };
	const restricted = { restricted: ["./lib"], name: "block lib" };
	const unused = { allowed: ["./unused"] };
	const unusedReport = [
		"Found 1 unused pattern(s) defined in rules:",
		"./src/* (1)",
		"rules[1] ./unused",
	];
	const restrictedReport = ["./src/a.ts (1)", "1:8 ./lib/x block lib"];
	const filesChecked = "Files Checked 1 file (2 found, 1 unscoped)";
	const onlyStart =
		'Found 1 scope(s) with "only: true", processing only these scopes';
	const onlyEnd = 'Failed due to "only: true" flag';

	describe.each([
		{ mode: "omitted", flags: [], unusedLines: [], unusedStatus: 0 },
		{
			mode: "off",
			flags: ["--unmatched-patterns", "off"],
			unusedLines: [],
			unusedStatus: 0,
		},
		{
			mode: "warn",
			flags: ["--unmatched-patterns", "warn"],
			unusedLines: unusedReport,
			unusedStatus: 0,
		},
		{
			mode: "error",
			flags: ["--unmatched-patterns", "error"],
			unusedLines: [
				...unusedReport,
				'Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.',
			],
			unusedStatus: 1,
		},
	])("--unmatched-patterns $mode", ({ flags, unusedLines, unusedStatus }) => {
		describe.each([
			{
				name: "allowed import",
				rules: [allowed],
				importLines: [],
				unusedLines: [],
				summary: "Restricted Imports 0 lines",
				status: 0,
			},
			{
				name: "restricted import",
				rules: [restricted],
				importLines: restrictedReport,
				unusedLines: [],
				summary: "Restricted Imports 1 line",
				status: 1,
			},
			{
				name: "allowed import with an unused rule",
				rules: [allowed, unused],
				importLines: [],
				unusedLines,
				summary: "Restricted Imports 0 lines",
				status: unusedStatus,
			},
			{
				name: "restricted import with an unused rule",
				rules: [restricted, unused],
				importLines: restrictedReport,
				unusedLines,
				summary: "Restricted Imports 1 line",
				status: 1,
			},
		])("$name", ({ rules, importLines, unusedLines, summary, status }) => {
			const scope = { scope: "./src/*", rules, only: false };
			const scopes = JSON.stringify([scope]);
			const onlyScopes = JSON.stringify([{ ...scope, only: true }]);

			test("omits the unscoped file list by default", () => {
				const result = runCli(scopes, files, flags);
				expectReport(result, status, [
					...importLines,
					...unusedLines,
					filesChecked,
					summary,
				]);
			});

			test("--unscoped lists the file outside the scope", () => {
				const result = runCli(scopes, files, ["--unscoped", ...flags]);
				expectReport(result, status, [
					...importLines,
					"Unscoped Files (1)",
					"./outside.ts",
					...unusedLines,
					filesChecked,
					summary,
				]);
			});

			test("only reports the selected scope and exits with a failure", () => {
				const result = runCli(onlyScopes, files, flags);
				expectReport(result, 1, [
					onlyStart,
					...importLines,
					...unusedLines,
					filesChecked,
					summary,
					onlyEnd,
				]);
			});

			test("only with --unscoped lists the file and still fails", () => {
				const result = runCli(onlyScopes, files, ["--unscoped", ...flags]);
				expectReport(result, 1, [
					onlyStart,
					...importLines,
					"Unscoped Files (1)",
					"./outside.ts",
					...unusedLines,
					filesChecked,
					summary,
					onlyEnd,
				]);
			});
		});
	});
});
