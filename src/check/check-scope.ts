import { dirname, relative, resolve } from "node:path";

import { exists } from "../exists";
import type { Report } from "../log-tree";
import type { VerboseLogger } from "../verbose-logger";
import { analyzeImportAccess } from "./analyze-import-access";
import { calcRules } from "./calc-rules";
import type { ErrorReport } from "./error-report";
import { findImportPaths } from "./find-import-paths";
import { makeAst } from "./make-ast";

export function checkScope(
	logger: VerboseLogger,
	declaration: Parameters<typeof calcRules>[2],
	filtered: readonly { relative: string; absolute: string }[],
	root: string,
	scoped: Set<string>,
	errorsRef: /* readwrite */ ErrorReport[],
	reports: /* readwrite */ Report[],
): void {
	for (const path of filtered) {
		const end3 = logger.start(`> > "${path.relative}" Make ast`);

		const makeAstResult = makeAst(path.absolute, errorsRef);
		if (!exists(makeAstResult)) {
			end3();
			continue;
		}
		end3();

		const { ast, positions } = makeAstResult;
		const rules = calcRules(root, path.absolute, declaration);

		const end4 = logger.start(`> > "${path.relative}" Find import paths`);
		const infoArray = findImportPaths(ast, positions).map(
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

		const analyzed = analyzeImportAccess(logger, rules, infoArray);

		reports.push({ path, result: analyzed });
		scoped.add(path.absolute);
	}
}
