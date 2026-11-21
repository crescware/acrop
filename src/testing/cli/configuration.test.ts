import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI configuration and file discovery", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	test("reports the invalid rule's config path and exits before scanning", () => {
		const result = runCli(
			'[{scope: "./src/*", rules: [{ allowed: 123 }]}]',
			{},
		);
		expect(result.status).toBe(1);
		expect(result.lines.join("\n")).toContain("default.scopes.0.rules.0");
		expect(result.lines).not.toContainEqual(
			expect.stringContaining("Files Checked"),
		);
		expect(result.lines.at(-1)).toBe("Exiting with code 1");
	});

	test("reports the requested path when the config file is missing", () => {
		const result = runCli(undefined, {});
		expect(result.status).toBe(1);
		expect(result.stderr).toContain(
			`Configuration file not found at: ${join(result.project, "acrop.config.ts")}`,
		);
		expect(result.lines).toEqual(["Exiting with code 1"]);
	});

	test("scans TSX from the config directory and respects its .gitignore", () => {
		const result = runCli(
			'[{ scope: "./src/**/*", rules: [{ restricted: ["./ui"], name: "UI boundary" }] }]',
			{
				".gitignore": "acrop.config.ts\nsrc/generated/\n",
				"src/page.tsx":
					"export const page = <div />;\r\nimport '../ui/button';",
				"src/generated/hidden.ts": "import '../../ui/button';",
				"outside.ts": "import './ui/button';",
			},
			["--unscoped"],
		);
		expectReport(result, 1, [
			"./src/page.tsx (1)",
			"2:8 ./ui/button UI boundary",
			"Unscoped Files (1)",
			"./outside.ts",
			"Files Checked 1 file (2 found, 1 unscoped)",
			"Restricted Imports 1 line",
		]);
	});
});
