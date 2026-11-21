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
import { expect } from "vitest";

type CliResult = {
	status: number | null;
	stderr: string;
	lines: string[];
	project: string;
};

export function createCliFixture() {
	const repository = fileURLToPath(new URL("../../../", import.meta.url));
	let buildDir: string;

	async function buildCli() {
		// Build once per suite. The CLI resolves its external dependencies here.
		buildDir = mkdtempSync(join(repository, "node_modules", ".acrop-test-"));
		await build({
			entry: [join(repository, "index.ts")],
			format: ["esm"],
			outDir: buildDir,
			outExtension: () => ({ js: ".mjs" }),
			silent: true,
		});
	}

	function removeBuild() {
		if (buildDir) rmSync(buildDir, { recursive: true, force: true });
	}

	function runCli(
		scopes: string | undefined,
		files: Record<string, string>,
		flags: string[] = [],
	): CliResult {
		const config = "acrop.config.ts";
		const fixture = { ...files };
		if (scopes !== undefined) {
			fixture[config] = `export default { root: ".", scopes: ${scopes} };`;
		}
		return runWithArgs(fixture, [join("project", config), ...flags]);
	}

	function runWithArgs(
		files: Record<string, string>,
		args: string[],
	): CliResult {
		const cwd = mkdtempSync(join(realpathSync(tmpdir()), "acrop-cli-test-"));
		const project = join(cwd, "project");
		try {
			const fixture = { ".gitignore": "acrop.config.ts", ...files };
			for (const [name, content] of Object.entries(fixture)) {
				const path = join(project, name);
				mkdirSync(dirname(path), { recursive: true });
				writeFileSync(path, content);
			}
			const result = spawnSync(
				process.execPath,
				[join(buildDir, "index.mjs"), ...args],
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

	return { buildCli, removeBuild, runCli, runWithArgs };
}

export function expectReport(
	result: CliResult,
	status: number,
	lines: string[],
) {
	expect(result.stderr).toBe("");
	expect(result.status).toBe(status);
	expect(result.lines).toEqual([...lines, `Exiting with code ${status}`]);
}
