import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI syntax errors in overlapping scopes", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	let result: ReturnType<typeof runCli>;

	beforeAll(async () => {
		await buildCli();
		result = runCli(
			'[{ scope: "./src/*", rules: [] }, { scope: "./**/*", rules: [] }]',
			{
				"src/bad.ts": "import",
				"src/good.ts": "import './foo';",
			},
		);
	});

	afterAll(removeBuild);

	test("reports the bad file and continues checking other files", () => {
		expect(result.status).toBe(1);
		expect(result.stderr).toBe("");
		expect(result.lines).toContain(join(result.project, "src/bad.ts"));
		expect(result.lines).toEqual(
			expect.arrayContaining([
				"./src/good.ts (1)",
				"1:8 ./src/foo ./src/*",
				"Files Checked 1 file (2 found, 1 unscoped)",
				"Restricted Imports 1 line",
				"Exiting with code 1",
			]),
		);
	});

	test("prints the diagnostic for the bad file once", () => {
		const path = join(result.project, "src/bad.ts");
		expect(result.lines.filter((line) => line === path)).toHaveLength(1);
	});

	test("includes the parser's reason for skipping the file", () => {
		expect(result.lines).toContainEqual(
			expect.stringMatching(/expected.*from.*EOF/i),
		);
	});

	test("prints syntax errors first and exits successfully when they are the only problem", () => {
		const syntaxOnly = runCli(
			'[{ scope: "./src/*", rules: [{ allowed: ["./lib"] }] }]',
			{ "src/bad.ts": "import", "src/good.ts": "import '../lib/x';" },
		);
		expectReport(syntaxOnly, 0, [
			join(syntaxOnly.project, "src/bad.ts"),
			expect.stringMatching(/expected.*from.*EOF/i),
			"Files Checked 1 file (2 found, 1 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});
});
