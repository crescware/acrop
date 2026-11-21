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

	test("does not descend through a link into a directory being searched", () => {
		const result = runCli(
			"[]",
			{
				"d/a.ts": "",
				"d/up": { symlink: ".." },
				self: { symlink: "." },
			},
			["--unscoped"],
		);
		expectReport(result, 0, [
			"Unscoped Files (1)",
			"./d/a.ts",
			"Files Checked 0 files (1 found, 1 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("follows links between sibling directories until they lead back", () => {
		const result = runCli(
			"[]",
			{
				"a/x.ts": "",
				"a/to-b": { symlink: "../b" },
				"b/y.ts": "",
				"b/to-a": { symlink: "../a" },
			},
			["--unscoped"],
		);
		expectReport(result, 0, [
			"Unscoped Files (4)",
			"./a/to-b/y.ts",
			"./a/x.ts",
			"./b/to-a/x.ts",
			"./b/y.ts",
			"Files Checked 0 files (4 found, 4 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});
});
