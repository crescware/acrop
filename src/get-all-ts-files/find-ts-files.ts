import { type BigIntStats, lstatSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type ignore from "ignore";

export function findTsFiles(
	rootDir: string,
	ig: ReturnType<typeof ignore>,
): readonly string[] {
	const results: string[] = [];
	// Device and inode of each directory from the scan root to the current one.
	// A symbolic link back to one of them would otherwise recurse forever.
	const ancestors = new Set<string>();

	function searchDir(dir: string, dirStat: BigIntStats): void {
		const id = `${dirStat.dev}:${dirStat.ino}`;
		if (ancestors.has(id)) {
			return;
		}
		ancestors.add(id);

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
				searchDir(fullPath, stat);
			} else if (isTypeScriptFile) {
				results.push(fullPath);
			}
		}

		ancestors.delete(id);
	}

	searchDir(rootDir, statSync(rootDir, { bigint: true }));
	return results as readonly string[];
}

// Returns null for a symbolic link whose target is missing or unresolvable.
// BigInt stats keep inode numbers exact on file systems with 64-bit inodes.
function statTarget(path: string): BigIntStats | null {
	try {
		return statSync(path, { bigint: true });
	} catch (error) {
		if (lstatSync(path).isSymbolicLink()) {
			return null;
		}
		throw error;
	}
}
