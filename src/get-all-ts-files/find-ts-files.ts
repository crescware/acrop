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

		const entries = readdirSync(dir, { withFileTypes: true });

		for (const entry of entries) {
			const file = entry.name;
			const fullPath = join(dir, file);

			// Skip if it matches .gitignore
			if (ig.ignores(relative(rootDir, fullPath))) {
				continue;
			}

			// The listing already tells a plain file apart, and most entries are
			// plain files, so they need no stat call.
			if (entry.isFile()) {
				if (isTypeScriptFile(file)) {
					results.push(fullPath);
				}
				continue;
			}

			// A link is judged by its target, and a directory is identified by its
			// device and inode.
			const stat = statTarget(fullPath);
			if (stat === null) {
				continue;
			}

			if (stat.isDirectory()) {
				searchDir(fullPath, stat);
			} else if (stat.isFile() && isTypeScriptFile(file)) {
				results.push(fullPath);
			}
		}

		ancestors.delete(id);
	}

	searchDir(rootDir, statSync(rootDir, { bigint: true }));
	return results as readonly string[];
}

function isTypeScriptFile(file: string): boolean {
	return file.endsWith(".ts") || file.endsWith(".tsx");
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
