import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI sibling boundaries", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	const files = {
		"src/team/a.ts":
			"import './b';\nimport './sub/c';\nimport '../team-other/d';",
	};
	const flags = ["--unmatched-patterns", "error"];
	const filesChecked = "Files Checked 1 file (1 found, 0 unscoped)";

	test("sibling: true allows imports from the same directory and its descendants", () => {
		const rules = [
			{ sibling: true, name: "local" },
			{ restricted: ["./src"], name: "external" },
		];
		const result = runCli(
			JSON.stringify([{ scope: "./src/team/*", rules }]),
			files,
			flags,
		);
		expectReport(result, 1, [
			"./src/team/a.ts (1)",
			"3:8 ./src/team-other/d external",
			filesChecked,
			"Restricted Imports 1 line",
		]);
	});

	test("sibling: false restricts imports from the same directory and its descendants", () => {
		const rules = [{ sibling: false, name: "local" }, { allowed: ["./src"] }];
		const result = runCli(
			JSON.stringify([{ scope: "./src/team/*", rules }]),
			files,
			flags,
		);
		expectReport(result, 1, [
			"./src/team/a.ts (2)",
			"1:8 ./src/team/b local",
			"2:8 ./src/team/sub/c local",
			filesChecked,
			"Restricted Imports 2 lines",
		]);
	});

	test("sibling matches the importer's own directory", () => {
		const result = runCli(
			JSON.stringify([{ scope: "./src/team/*", rules: [{ sibling: true }] }]),
			{ "src/team/a.ts": "import '.';" },
			flags,
		);
		expectReport(result, 0, [filesChecked, "Restricted Imports 0 lines"]);
	});
});
