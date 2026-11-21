import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI scope and rule selection", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	test("evaluates typed allowed and restricted functions for each importer", () => {
		const scopes = `[{ scope: "./src/*", rules: [
		{ name: "block UI", restricted: (file: string) => file === "./src/a.ts" ? ["./ui"] : [] },
		{ allowed: (file: string) => file === "./src/b.ts" ? ["./ui"] : [] }
	] }]`;
		const result = runCli(scopes, {
			"src/a.ts": "import '../ui/x';",
			"src/b.ts": "import '../ui/x';",
		});
		expectReport(result, 1, [
			"./src/a.ts (1)",
			"1:8 ./ui/x block UI",
			"Files Checked 2 files (2 found, 0 unscoped)",
			"Restricted Imports 1 line",
		]);
	});

	const allow = { allowed: ["./ui"] };
	const restrict = { restricted: ["./ui"], name: "UI boundary" };
	const narrow = { scope: "./src/domain/*", rules: [allow] };
	const broad = { scope: "./src/**/*", rules: [restrict] };

	const domainFiles = { "src/domain/a.ts": "import '../../ui/x';" };
	const domainSummary = "Files Checked 1 file (1 found, 0 unscoped)";

	test.each([
		{ order: "narrow scope first", scopes: [narrow, broad] },
		{
			order: "allow rule first",
			scopes: [{ ...narrow, rules: [allow, restrict] }],
		},
	])("allows the import with $order", ({ scopes }) => {
		const result = runCli(JSON.stringify(scopes), domainFiles);
		expectReport(result, 0, [domainSummary, "Restricted Imports 0 lines"]);
	});

	test.each([
		{ order: "broad scope first", scopes: [broad, narrow] },
		{
			order: "restrict rule first",
			scopes: [{ ...narrow, rules: [restrict, allow] }],
		},
	])("reports the restricted import with $order", ({ scopes }) => {
		const result = runCli(JSON.stringify(scopes), domainFiles);
		expectReport(result, 1, [
			"./src/domain/a.ts (1)",
			"1:8 ./ui/x UI boundary",
			domainSummary,
			"Restricted Imports 1 line",
		]);
	});

	describe("two only scopes", () => {
		const scopes = JSON.stringify([
			{ scope: "./ordinary/*", only: false, rules: [restrict] },
			{ scope: "./first/*", only: true, rules: [restrict] },
			{ scope: "./second/*", only: true, rules: [restrict] },
		]);
		const source = "import '../ui/x';";
		const onlyStart =
			'Found 2 scope(s) with "only: true", processing only these scopes';
		const filesChecked = "Files Checked 2 files (3 found, 1 unscoped)";
		const onlyEnd = 'Failed due to "only: true" flag';

		function checkSelectedScopes(selectedSource: string) {
			return runCli(scopes, {
				"ordinary/a.ts": source,
				"first/a.ts": selectedSource,
				"second/a.ts": selectedSource,
			});
		}

		test("reports violations in both selected scopes", () => {
			const result = checkSelectedScopes(source);
			expectReport(result, 1, [
				onlyStart,
				"./first/a.ts (1)",
				"1:8 ./ui/x UI boundary",
				"./second/a.ts (1)",
				"1:8 ./ui/x UI boundary",
				filesChecked,
				"Restricted Imports 2 lines",
				onlyEnd,
			]);
		});

		test("fails for only even when the sole violation is outside the selected scopes", () => {
			const result = checkSelectedScopes("");
			expectReport(result, 1, [
				onlyStart,
				filesChecked,
				"Restricted Imports 0 lines",
				onlyEnd,
			]);
		});
	});
});
