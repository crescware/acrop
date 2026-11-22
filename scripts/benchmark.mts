import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { stripVTControlCharacters } from "node:util";

function main(): void {
	const repository = fileURLToPath(new URL("../", import.meta.url));
	const cli = join(repository, "dist", "index.mjs");
	// Keep the benchmark input fixed as the implementation changes.
	const fixtureRevision = "48bd6e3e597e5263e812acc1051d00cf4b83362e";
	const copies = 60;
	const runs = 7;
	const configFile = "acrop.config.ts";
	// Every configuration passes, so each run checks all files and reports none.
	const scenarios = [
		{
			// Reading and parsing the files takes almost all of the time.
			name: "1 scope",
			config: `
const target = ["./**/*"];
const scope: string = "./**/*";
export default {
    root: ".",
    scopes: [{scope, rules: [
        {allowed: (path: string) => path.startsWith("./lib/") ? target : []},
    ]}],
};
`,
		},
		{
			// Each copy is a package with one scope for its tests and one for the
			// rest, using every kind of rule. Matching files to scopes and imports
			// to rules takes a share of the time that grows with the configuration.
			name: `${copies * 2} scopes`,
			config: `
const packages = Array.from({length: ${copies}}, (_, i) => "./lib/copy" + i);
export default {
    root: ".",
    scopes: packages.flatMap((pkg) => [
        {scope: pkg + "/testing/**/*", rules: [{allowed: [pkg]}]},
        {scope: pkg + "/**/*", rules: [
            {allowed: (path: string) => path.endsWith(".test.ts") ? [pkg + "/testing"] : []},
            {restricted: [pkg + "/testing"], name: "No test helpers outside tests"},
            {sibling: true},
            {allowed: [pkg]},
        ]},
    ]),
};
`,
		},
	];

	const temporary = mkdtempSync(join(tmpdir(), "acrop-bench-"));
	try {
		const archive = execFileSync("git", ["archive", fixtureRevision, "src"], {
			cwd: repository,
		});
		execFileSync("tar", ["-xf", "-"], { cwd: temporary, input: archive });

		const project = join(temporary, "project");
		const lib = join(project, "lib");
		mkdirSync(lib, { recursive: true });
		for (let copy = 0; copy < copies; copy++) {
			cpSync(join(temporary, "src"), join(lib, `copy${copy}`), {
				recursive: true,
			});
		}
		writeFileSync(join(project, ".gitignore"), `${configFile}\n`);

		function measure() {
			const start = performance.now();
			const stdout = execFileSync(process.execPath, [cli, configFile], {
				cwd: project,
				encoding: "utf8",
			});
			const elapsed = performance.now() - start;
			if (
				!/Files Checked\s+4920 files \(4920 found, 0 unscoped\)/.test(
					stripVTControlCharacters(stdout),
				)
			) {
				throw new Error(`Expected acrop to check all 4,920 files.\n${stdout}`);
			}
			return elapsed;
		}

		console.info(
			`acrop CLI, 4,920 files, Node ${process.version} (${process.platform}/${process.arch})`,
		);
		for (const scenario of scenarios) {
			writeFileSync(join(project, configFile), scenario.config);
			console.info(`\n${scenario.name}`);
			console.info(`Warm-up: ${measure().toFixed(1)} ms`);
			const timings = [];
			for (let run = 1; run <= runs; run++) {
				const elapsed = measure();
				timings.push(elapsed);
				console.info(`Run ${run}/${runs}: ${elapsed.toFixed(1)} ms`);
			}
			timings.sort((a, b) => a - b);
			const median = timings[Math.floor(timings.length / 2)];
			if (median === undefined) {
				throw new Error("No timed benchmark runs completed.");
			}
			console.info(`Median: ${median.toFixed(1)} ms`);
		}
	} finally {
		rmSync(temporary, { recursive: true, force: true });
	}
}

main();
