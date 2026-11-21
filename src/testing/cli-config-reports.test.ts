import { spawnSync } from "node:child_process";
import {
	mkdirSync,
	mkdtempSync,
	realpathSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { stripVTControlCharacters } from "node:util";
import { build } from "tsup";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe("CLI configuration reports", () => {
	const repository = fileURLToPath(new URL("../../", import.meta.url));
	let buildDir: string;

	beforeAll(async () => {
		// Build once from the checkout. The CLI resolves its external dependencies here.
		buildDir = mkdtempSync(join(repository, "node_modules", ".acrop-test-"));
		await build({
			entry: [join(repository, "index.ts")],
			format: ["esm"],
			outDir: buildDir,
			outExtension: () => ({ js: ".mjs" }),
			silent: true,
		});
	});

	afterAll(() => {
		if (buildDir) rmSync(buildDir, { recursive: true, force: true });
	});

	function runCli(
		scopes: string | undefined,
		files: Record<string, string>,
		flags: string[] = [],
	) {
		const cwd = mkdtempSync(join(realpathSync(tmpdir()), "acrop-cli-test-"));
		const project = join(cwd, "project");
		const config = "acrop.config.ts";
		try {
			const fixture: Record<string, string> = {
				".gitignore": config,
				...files,
			};
			if (scopes !== undefined) {
				fixture[config] = `export default { root: ".", scopes: ${scopes} };`;
			}
			for (const [name, content] of Object.entries(fixture)) {
				const path = join(project, name);
				mkdirSync(dirname(path), { recursive: true });
				writeFileSync(path, content);
			}
			const result = spawnSync(
				process.execPath,
				[join(buildDir, "index.mjs"), join("project", config), ...flags],
				{
					cwd,
					encoding: "utf8",
					timeout: 10000,
				},
			);
			if (result.error) throw result.error;
			const lines = stripVTControlCharacters(result.stdout)
				.split(/\r?\n/)
				.map((line) => line.trim().replace(/\s+/g, " "))
				.filter((line) => line && !line.startsWith("Duration "));
			return { status: result.status, stderr: result.stderr, lines, project };
		} finally {
			rmSync(cwd, { recursive: true, force: true });
		}
	}

	function expectReport(
		result: ReturnType<typeof runCli>,
		status: number,
		lines: string[],
	) {
		expect(result.stderr).toBe("");
		expect(result.status).toBe(status);
		expect(result.lines).toEqual([...lines, `Exiting with code ${status}`]);
	}

	test("evaluates typed allowed and restricted functions for each importer", () => {
		const scopes = `[{ scope: "./src/*", rules: [
		{ name: "block UI", restricted: (file: string) => file === "./src/a.ts" ? ["./ui"] : [] },
		{ allowed: (file: string) => file === "./src/b.ts" ? ["./ui"] : [] }
	] }]`;
		const result = runCli(scopes, {
			"src/a.ts": "import '../ui/x';",
			"src/b.ts": "import '../ui/x';",
		});
		expectReport(result, 1, [
			"./src/a.ts (1)",
			"1:8 ./ui/x block UI",
			"Files Checked 2 files (2 found, 0 unscoped)",
			"Restricted Imports 1 line",
		]);
	});

	const allow = { allowed: ["./ui"] };
	const restrict = { restricted: ["./ui"], name: "UI boundary" };
	const narrow = { scope: "./src/domain/*", rules: [allow] };
	const broad = { scope: "./src/**/*", rules: [restrict] };

	test.each([
		{ order: "narrow scope first", scopes: [narrow, broad], restricted: false },
		{ order: "broad scope first", scopes: [broad, narrow], restricted: true },
		{
			order: "allow rule first",
			scopes: [{ ...narrow, rules: [allow, restrict] }],
			restricted: false,
		},
		{
			order: "restrict rule first",
			scopes: [{ ...narrow, rules: [restrict, allow] }],
			restricted: true,
		},
	])("uses the first match with $order", ({ scopes, restricted }) => {
		const result = runCli(JSON.stringify(scopes), {
			"src/domain/a.ts": "import '../../ui/x';",
		});
		expectReport(result, restricted ? 1 : 0, [
			...(restricted
				? ["./src/domain/a.ts (1)", "1:8 ./ui/x UI boundary"]
				: []),
			"Files Checked 1 file (1 found, 0 unscoped)",
			restricted ? "Restricted Imports 1 line" : "Restricted Imports 0 lines",
		]);
	});

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

	test.each([true, false])(
		"processes both only scopes when they contain violations: %s",
		(hasViolations) => {
			const scopes = ["ordinary", "first", "second"].map((dir) => ({
				scope: `./${dir}/*`,
				only: dir !== "ordinary",
				rules: [restrict],
			}));
			const source = "import '../ui/x';";
			const result = runCli(JSON.stringify(scopes), {
				"ordinary/a.ts": source,
				"first/a.ts": hasViolations ? source : "",
				"second/a.ts": hasViolations ? source : "",
			});
			expectReport(result, 1, [
				'Found 2 scope(s) with "only: true", processing only these scopes',
				...(hasViolations
					? [
							"./first/a.ts (1)",
							"1:8 ./ui/x UI boundary",
							"./second/a.ts (1)",
							"1:8 ./ui/x UI boundary",
						]
					: []),
				"Files Checked 2 files (3 found, 1 unscoped)",
				hasViolations
					? "Restricted Imports 2 lines"
					: "Restricted Imports 0 lines",
				'Failed due to "only: true" flag',
			]);
		},
	);

	describe("unused patterns in different scopes", () => {
		function checkPatterns(secondName: string) {
			const scopes = ["a", "b"].map((dir) => ({
				scope: `./${dir}/*`,
				rules: [
					{ allowed: ["./lib"], name: dir === "a" ? "shared" : secondName },
				],
			}));
			return runCli(
				JSON.stringify(scopes),
				{ "a/file.ts": "import '../lib/x';", "b/file.ts": "export {};" },
				["--unmatched-patterns", "error"],
			);
		}

		function expectUnusedInSecondScope(result: ReturnType<typeof runCli>) {
			expectReport(result, 1, [
				"Found 1 unused pattern(s) defined in rules:",
				"./b/* (1)",
				"rules[0] ./lib",
				'Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.',
				"Files Checked 2 files (2 found, 0 unscoped)",
				"Restricted Imports 0 lines",
			]);
		}

		test("attributes the unused rule to the second scope", () => {
			expectUnusedInSecondScope(checkPatterns("other"));
		});

		// Known defect: identical rule names currently share their matched state across scopes.
		test.fails("keeps the unused pattern when both rules have the same name", () => {
			expectUnusedInSecondScope(checkPatterns("shared"));
		});
	});

	describe("a syntax error in overlapping scopes", () => {
		let result: ReturnType<typeof runCli>;
		beforeAll(() => {
			result = runCli(
				'[{ scope: "./src/*", rules: [] }, { scope: "./**/*", rules: [] }]',
				{
					"src/bad.ts": "import",
					"src/good.ts": "import './foo';",
				},
			);
		});

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

		// Known defect: each matching scope currently emits the same parse error.
		test.fails("prints the diagnostic for the bad file once", () => {
			const path = join(result.project, "src/bad.ts");
			expect(result.lines.filter((line) => line === path)).toHaveLength(1);
		});

		// Known defect: the rendered diagnostic currently drops the parser's message.
		test.fails("includes the parser's reason for skipping the file", () => {
			expect(result.lines).toContainEqual(
				expect.stringMatching(/expected.*from.*EOF/i),
			);
		});
	});
});
