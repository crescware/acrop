import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { createCliFixture } from "./cli-fixture";

describe("CLI input errors", () => {
	const { buildCli, removeBuild, runWithArgs } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	test.each([
		{ args: [], diagnostic: /Configuration file not found/ },
		{ args: ["--unknown"], diagnostic: /unknown or unexpected option/i },
		{
			args: ["project/acrop.config.ts", "--unmatched-patterns"],
			diagnostic: /requires argument/i,
		},
		{
			args: ["--unmatched-patterns", "fatal", "project/acrop.config.ts"],
			diagnostic: /Invalid value.*off.*warn.*error.*fatal/,
		},
	])("reports invalid arguments $args", ({ args, diagnostic }) => {
		const result = runWithArgs({}, args);
		expect(result.stderr).toMatch(diagnostic);
		expect(result.lines).toEqual(["Exiting with code 1"]);
		expect(result.status).toBe(1);
	});

	test.each([
		{ config: "export {};", field: "default" },
		{ config: "export default { scopes: [] }", field: "default.root" },
		{ config: 'export default { root: "." }', field: "default.scopes" },
		{
			config: 'export default { root: "", scopes: [] }',
			field: "default.root",
		},
		{
			config: 'export default { root: ".", scopes: [], typo: true }',
			field: "default.typo",
		},
		{
			config: 'export default { root: ".", scopes: [{scope:"", rules:[]}] }',
			field: "default.scopes.0.scope",
		},
		{
			config:
				'export default { root: ".", scopes: [{scope:"./*", rules:[{allowed:[], restricted:[]}]}] }',
			field: "default.scopes.0.rules.0",
		},
		{
			config:
				'export default { root: ".", scopes: [{scope:"./*", rules:[{sibling:"yes"}]}] }',
			field: "default.scopes.0.rules.0",
		},
	])("identifies the invalid field in $config", ({ config, field }) => {
		const result = runWithArgs({ "acrop.config.ts": config }, [
			"project/acrop.config.ts",
		]);
		expect(result.status).toBe(1);
		expect(result.lines.join("\n")).toContain(field);
		expect(result.lines.at(-1)).toBe("Exiting with code 1");
		expect(result.lines.join("\n")).not.toContain("Files Checked");
	});

	test("reports a TypeScript syntax error in the config", () => {
		const result = runWithArgs({ "acrop.config.ts": "export default {" }, [
			"project/acrop.config.ts",
		]);
		expect(result.status).toBe(1);
		expect(result.stderr).toMatch(/acrop\.config\.ts/);
		expect(result.stderr).toMatch(/Unexpected token/);
		expect(result.lines).toEqual(["Exiting with code 1"]);
	});
});
