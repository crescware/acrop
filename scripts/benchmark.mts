import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { stripVTControlCharacters } from "node:util";

const repository = fileURLToPath(new URL("../", import.meta.url));
const cli = join(repository, "dist", "index.mjs");
// Keep the benchmark input fixed as the implementation changes.
const fixtureRevision = "48bd6e3e597e5263e812acc1051d00cf4b83362e";
const copies = 60;
const runs = 7;
const configFile = "acrop.config.ts";
const config = `
const target = ["./**/*"];
const scope: string = "./**/*";
export default {
    root: ".",
    scopes: [{scope, rules: [
        {allowed: (path: string) => path.startsWith("./lib/") ? target : []},
    ]}],
};
`;

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
	writeFileSync(join(project, configFile), config);
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
} finally {
	rmSync(temporary, { recursive: true, force: true });
}
