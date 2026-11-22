import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI symbolic links", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	test("follows links to files and directories", () => {
		const result = runCli(
			"[]",
			{
				"real/a.ts": "",
				"link.ts": { symlink: "real/a.ts" },
				linkdir: { symlink: "real" },
			},
			["--unscoped"],
		);
		expectReport(result, 0, [
			"Unscoped Files (3)",
			"./link.ts",
			"./linkdir/a.ts",
			"./real/a.ts",
			"Files Checked 0 files (3 found, 3 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("skips links whose targets cannot be resolved", () => {
		const result = runCli(
			'[{ scope: "./**/*", rules: [] }]',
			{
				"a.ts": "import './b';",
				"missing-file.ts": { symlink: "missing.ts" },
				"missing-dir": { symlink: "missing" },
				"self.ts": { symlink: "self.ts" },
			},
			["--unscoped"],
		);
		expectReport(result, 1, [
			"./a.ts (1)",
			"1:8 ./b ./**/*",
			"Unscoped Files (0)",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 1 line",
		]);
	});
});
