import { type Stats, lstatSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type ignore from "ignore";

export function findTsFiles(
	rootDir: string,
	ig: ReturnType<typeof ignore>,
): readonly string[] {
	const results: string[] = [];

	function searchDir(dir: string): void {
		const files = readdirSync(dir);

		for (const file of files) {
			const fullPath = join(dir, file);

			// Skip if it matches .gitignore
			if (ig.ignores(relative(rootDir, fullPath))) {
				continue;
			}

			const stat = statTarget(fullPath);
			if (stat === null) {
				continue;
			}

			const isTypeScriptFile =
				stat.isFile() && (file.endsWith(".ts") || file.endsWith(".tsx"));

			if (stat.isDirectory()) {
				searchDir(fullPath);
			} else if (isTypeScriptFile) {
				results.push(fullPath);
			}
		}
	}

	searchDir(rootDir);
	return results as readonly string[];
}

// Returns null for a symbolic link whose target is missing or unresolvable.
function statTarget(path: string): Stats | null {
	try {
		return statSync(path);
	} catch (error) {
		if (lstatSync(path).isSymbolicLink()) {
			return null;
		}
		throw error;
	}
}
