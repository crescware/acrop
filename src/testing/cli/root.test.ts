import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("configured scan root", () => {
	const { buildCli, removeBuild, runWithArgs } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	test("resolves the root from the config and uses it for discovery, ignores, rules and reports", () => {
		const result = runWithArgs(
			{
				"acrop.config.ts": `export default { root: "./src", scopes: [{ scope: "./domain/*", rules: [
				{ restricted: (file: string) => file === "./domain/a.ts" ? ["./ui"] : [], name: "UI boundary" }
			] }] };`,
				"src/.gitignore": "domain/ignored.ts",
				"src/domain/ignored.ts": "import '../ui/x';",
				"src/domain/a.ts": "import '../ui/x';",
				"src/unscoped.ts": "",
				"outside.ts": "",
			},
			["project/acrop.config.ts", "--unscoped"],
		);
		expectReport(result, 1, [
			"./domain/a.ts (1)",
			"1:8 ./ui/x UI boundary",
			"Unscoped Files (1)",
			"./unscoped.ts",
			"Files Checked 1 file (2 found, 1 unscoped)",
			"Restricted Imports 1 line",
		]);
	});

	test("reports a missing scan directory", () => {
		const result = runWithArgs(
			{
				"acrop.config.ts": 'export default { root: "./missing", scopes: [] };',
			},
			["project/acrop.config.ts"],
		);
		expect(result.status).toBe(1);
		expect(result.stderr).toContain(join(result.project, "missing"));
		expect(result.lines).toEqual(["Exiting with code 1"]);
	});
});
