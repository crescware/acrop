import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI import extraction", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	// Without rules, every checked import is reported, so the report lists
	// exactly the imports that acrop extracted.
	const scopes = '[{ scope: "./src/*", rules: [] }]';

	function checkImports(source: string) {
		return runCli(scopes, { "src/a.ts": source });
	}

	test("checks type-only, multi-line and side-effect import declarations", () => {
		const result = checkImports(
			[
				'import type { T } from "./types";',
				"import {",
				"\ta,",
				'} from "./multi";',
				'import "./effect";',
			].join("\n"),
		);
		expectReport(result, 1, [
			"./src/a.ts (3)",
			"1:24 ./src/types ./src/*",
			"4:8 ./src/multi ./src/*",
			"5:8 ./src/effect ./src/*",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 3 lines",
		]);
	});

	test("skips re-exports, dynamic imports and require calls", () => {
		const result = checkImports(
			[
				'export { b } from "./named";',
				'export * from "./star";',
				'const c = import("./dynamic");',
				'const d = require("./required");',
				'import e = require("./import-equals");',
			].join("\n"),
		);
		expectReport(result, 0, [
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("skips import declarations below the top level of the file", () => {
		const result = checkImports(
			[
				"{",
				'\timport "./block";',
				"}",
				'declare module "m" {',
				'\timport { n } from "./ambient";',
				"\texport const v: typeof n;",
				"}",
			].join("\n"),
		);
		expectReport(result, 0, [
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 0 lines",
		]);
	});

	test("reports repeated specifiers in source order", () => {
		const result = checkImports(
			['import "./x";', 'import "./y";', 'import a from "./x";'].join("\n"),
		);
		expectReport(result, 1, [
			"./src/a.ts (3)",
			"1:8 ./src/x ./src/*",
			"2:8 ./src/y ./src/*",
			"3:15 ./src/x ./src/*",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 3 lines",
		]);
	});

	test("resolves every specifier as a path relative to the importer", () => {
		const result = checkImports(
			[
				'import "react";',
				'import "@/alias";',
				'import "..";',
				'import "../../outside";',
			].join("\n"),
		);
		expectReport(result, 1, [
			"./src/a.ts (4)",
			"1:8 ./src/react ./src/*",
			"2:8 ./src/@/alias ./src/*",
			"3:8 ./ ./src/*",
			"4:8 ./../outside ./src/*",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 4 lines",
		]);
	});

	test("counts columns in characters after non-ASCII text", () => {
		const result = checkImports(
			'// 日本語のコメント\nconst s = "あいう"; import "./b";',
		);
		expectReport(result, 1, [
			"./src/a.ts (1)",
			"2:25 ./src/b ./src/*",
			"Files Checked 1 file (1 found, 0 unscoped)",
			"Restricted Imports 1 line",
		]);
	});
});
