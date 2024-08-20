import type ignore from "ignore";
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

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

      const stat = statSync(fullPath);

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
