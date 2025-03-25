import { relative, resolve } from "node:path";

import type { VerboseLogger } from "../verbose-logger";
import { findTsFiles } from "./find-ts-files";
import { loadGitignore } from "./load-gitignore";

export function getAllTsFiles(
	logger: VerboseLogger,
	root: string,
): readonly { relative: string; absolute: string }[] {
	const end = logger.start("Find TypeScript files");

	const tsFiles = ((): readonly string[] => {
		const ig = loadGitignore(root);
		return findTsFiles(root, ig);
	})().map((v): { relative: string; absolute: string } => {
		return { relative: `./${relative(root, v)}`, absolute: resolve(root, v) };
	});

	end();

	return tsFiles;
}
