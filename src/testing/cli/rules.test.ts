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

	test.each([
		{ order: "narrow scope first", scopes: [narrow, broad], restricted: false },
		{ order: "broad scope first", scopes: [broad, narrow], restricted: true },
		{
			order: "allow rule first",
			scopes: [{ ...narrow, rules: [allow, restrict] }],
			restricted: false,
		},
		{
			order: "restrict rule first",
			scopes: [{ ...narrow, rules: [restrict, allow] }],
			restricted: true,
		},
	])("uses the first match with $order", ({ scopes, restricted }) => {
		const result = runCli(JSON.stringify(scopes), {
			"src/domain/a.ts": "import '../../ui/x';",
		});
		expectReport(result, restricted ? 1 : 0, [
			...(restricted
				? ["./src/domain/a.ts (1)", "1:8 ./ui/x UI boundary"]
				: []),
			"Files Checked 1 file (1 found, 0 unscoped)",
			restricted ? "Restricted Imports 1 line" : "Restricted Imports 0 lines",
		]);
	});

	test.each([true, false])(
		"processes both only scopes when they contain violations: %s",
		(hasViolations) => {
			const scopes = ["ordinary", "first", "second"].map((dir) => ({
				scope: `./${dir}/*`,
				only: dir !== "ordinary",
				rules: [restrict],
			}));
			const source = "import '../ui/x';";
			const result = runCli(JSON.stringify(scopes), {
				"ordinary/a.ts": source,
				"first/a.ts": hasViolations ? source : "",
				"second/a.ts": hasViolations ? source : "",
			});
			expectReport(result, 1, [
				'Found 2 scope(s) with "only: true", processing only these scopes',
				...(hasViolations
					? [
							"./first/a.ts (1)",
							"1:8 ./ui/x UI boundary",
							"./second/a.ts (1)",
							"1:8 ./ui/x UI boundary",
						]
					: []),
				"Files Checked 2 files (3 found, 1 unscoped)",
				hasViolations
					? "Restricted Imports 2 lines"
					: "Restricted Imports 0 lines",
				'Failed due to "only: true" flag',
			]);
		},
	);
});
