import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI file discovery", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	function listFiles(files: Record<string, string>, scopes = "[]") {
		return runCli(scopes, files, ["--unscoped"]);
	}

	test("finds .ts, .tsx and .d.ts files only", () => {
		const result = listFiles({
			"a.ts": "",
			"b.tsx": "",
			"c.d.ts": "",
			"d.mts": "",
			"e.cts": "",
			"f.js": "",
			"g.jsx": "",
		});
		expectReport(result, 0, [
			"Unscoped Files (3)",
			"./a.ts",
			"./b.tsx",
			"./c.d.ts",
			"Files Checked 0 files (3 found, 3 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("visits each directory depth-first in byte order of entry names", () => {
		const result = listFiles({
			"b.ts": "",
			"a.ts": "",
			"a-b.ts": "",
			"a/z.ts": "",
			"B.ts": "",
		});
		expectReport(result, 0, [
			"Unscoped Files (5)",
			"./B.ts",
			"./a/z.ts",
			"./a-b.ts",
			"./a.ts",
			"./b.ts",
			"Files Checked 0 files (5 found, 5 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("keeps that order and reports a syntax error when a scope's files are parsed in several batches", () => {
		const names = Array.from(
			{ length: 150 },
			(_, i) => `f${String(i).padStart(3, "0")}.ts`,
		);
		const files = Object.fromEntries(
			names.map((name) => [`src/${name}`, 'import "./x";']),
		);
		const result = runCli('[{ scope: "./src/*", rules: [] }]', {
			...files,
			"src/f070.ts": "import",
		});
		expectReport(result, 1, [
			join(result.project, "src/f070.ts"),
			expect.stringMatching(/expected.*from.*EOF/i),
			...names
				.filter((name) => name !== "f070.ts")
				.flatMap((name) => [`./src/${name} (1)`, "1:8 ./src/x ./src/*"]),
			"Files Checked 149 files (150 found, 1 unscoped)",
			"Restricted Imports 149 lines",
		]);
	});

	test("finds dot files, which only scope globs naming the dot segment match", () => {
		const result = listFiles(
			{
				".hidden/a.ts": "",
				".explicit/a.ts": "",
				"src/.b.ts": "",
				"src/c.ts": "",
			},
			'[{ scope: "./**/*", rules: [] }, { scope: "./.explicit/*", rules: [] }]',
		);
		expectReport(result, 0, [
			"Unscoped Files (2)",
			"./.hidden/a.ts",
			"./src/.b.ts",
			"Files Checked 2 files (4 found, 2 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("counts the config file when .gitignore does not list it", () => {
		const result = listFiles({ ".gitignore": "", "a.ts": "" });
		expectReport(result, 0, [
			"Unscoped Files (2)",
			"./a.ts",
			"./acrop.config.ts",
			"Files Checked 0 files (2 found, 2 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("applies negated .gitignore patterns", () => {
		const result = listFiles({
			".gitignore": "acrop.config.ts\n*.gen.ts\n!keep.gen.ts\n",
			"drop.gen.ts": "",
			"keep.gen.ts": "",
		});
		expectReport(result, 0, [
			"Unscoped Files (1)",
			"./keep.gen.ts",
			"Files Checked 0 files (1 found, 1 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("ignores .gitignore files below the scan directory", () => {
		const result = listFiles({
			"nested/.gitignore": "local.ts\n",
			"nested/local.ts": "",
		});
		expectReport(result, 0, [
			"Unscoped Files (1)",
			"./nested/local.ts",
			"Files Checked 0 files (1 found, 1 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("scans node_modules unless .gitignore lists it", () => {
		const result = listFiles({ "node_modules/pkg/index.ts": "" });
		expectReport(result, 0, [
			"Unscoped Files (1)",
			"./node_modules/pkg/index.ts",
			"Files Checked 0 files (1 found, 1 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});
});
