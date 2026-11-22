import { dirname, relative, resolve } from "node:path";

import { exists } from "../exists";
import type { Report } from "../log-tree";
import type { UnmatchedPatternsTracker } from "../unmatched-pattern-tracker";
import type { VerboseLogger } from "../verbose-logger";
import { analyzeImportAccess } from "./analyze-import-access";
import { calcRules } from "./calc-rules";
import type { ErrorReport } from "./error-report";
import { findImportPaths } from "./find-import-paths";
import { parseImports } from "./parse-imports";

export function checkScope(
	logger: VerboseLogger,
	declaration: Parameters<typeof calcRules>[2],
	filtered: readonly { relative: string; absolute: string }[],
	root: string,
	scoped: Set<string>,
	errorsRef: /* readwrite */ ErrorReport[],
	reports: /* readwrite */ Report[],
	trackerRef: UnmatchedPatternsTracker,
): void {
	for (const path of filtered) {
		const end3 = logger.start(`> > "${path.relative}" Make ast`);

		const parsed = parseImports(path.absolute, errorsRef);
		if (!exists(parsed)) {
			end3();
			continue;
		}
		end3();

		const { imports, positions } = parsed;
		const rules = calcRules(root, path.absolute, declaration, trackerRef);

		const end4 = logger.start(`> > "${path.relative}" Find import paths`);
		const infoArray = findImportPaths(imports, positions).map(
			(v): ReturnType<typeof findImportPaths>[number] => {
				const relativePath = `./${relative(
					root,
					resolve(dirname(path.absolute), v.path.relative),
				)}`;
				return {
					path: { relative: relativePath },
					line: v.line,
					column: v.column,
				};
			},
		);
		end4();

		const analyzed = analyzeImportAccess(logger, rules, infoArray, trackerRef);

		reports.push({ path, result: analyzed });
		scoped.add(path.absolute);
	}
}
