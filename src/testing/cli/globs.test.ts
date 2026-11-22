import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI glob matching", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	const filesChecked = "Files Checked 1 file (1 found, 0 unscoped)";

	function checkImports(rules: unknown[], imports: string[]) {
		return runCli(
			JSON.stringify([{ scope: "./src/*", rules }]),
			{ "src/a.ts": imports.map((v) => `import "${v}";`).join("\n") },
			["--unmatched-patterns", "warn"],
		);
	}

	test("a directory pattern matches the directory and its descendants only", () => {
		const result = checkImports(
			[{ allowed: ["./lib"] }],
			["../lib", "../lib/x", "../lib/x/y", "../library"],
		);
		expectReport(result, 1, [
			"./src/a.ts (1)",
			"4:8 ./library ./src/*",
			filesChecked,
			"Restricted Imports 1 line",
		]);
	});

	test("a pattern ending in /**/* also matches the directory itself", () => {
		const result = checkImports(
			[{ allowed: ["./lib/**/*"] }],
			["../lib", "../lib/x"],
		);
		expectReport(result, 0, [filesChecked, "Restricted Imports 0 lines"]);
	});

	test("expands braces in a pattern", () => {
		const result = checkImports(
			[{ allowed: ["./{ui,shared}"] }],
			["../ui/x", "../shared", "../other"],
		);
		expectReport(result, 1, [
			"./src/a.ts (1)",
			"3:8 ./other ./src/*",
			filesChecked,
			"Restricted Imports 1 line",
		]);
	});

	test("a pattern without the ./ prefix never matches", () => {
		const result = checkImports([{ allowed: ["lib"] }], ["../lib/x"]);
		expectReport(result, 1, [
			"./src/a.ts (1)",
			"1:8 ./lib/x ./src/*",
			"Found 1 unused pattern(s) defined in rules:",
			"./src/* (1)",
			"rules[0] lib",
			filesChecked,
			"Restricted Imports 1 line",
		]);
	});

	test("wildcards do not match dot segments", () => {
		const result = checkImports(
			[{ allowed: ["./**/*"] }],
			["../lib/x", "../.cache/x", "../lib/.hidden"],
		);
		expectReport(result, 1, [
			"./src/a.ts (2)",
			"2:8 ./.cache/x ./src/*",
			"3:8 ./lib/.hidden ./src/*",
			filesChecked,
			"Restricted Imports 2 lines",
		]);
	});

	test("a negated scope matches the files outside its pattern", () => {
		const result = runCli(
			'[{ scope: "!./src/*", rules: [] }]',
			{ "src/a.ts": "import './b';", "other/a.ts": "import './b';" },
			["--unscoped"],
		);
		expectReport(result, 1, [
			"./other/a.ts (1)",
			"1:8 ./other/b !./src/*",
			"Unscoped Files (1)",
			"./src/a.ts",
			"Files Checked 1 file (2 found, 1 unscoped)",
			"Restricted Imports 1 line",
		]);
	});
});
