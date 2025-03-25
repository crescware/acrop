import { dirname, relative, resolve } from "node:path";
import { minimatch } from "minimatch";

import { calcAllowed } from "./calc-allowed";
import type { ErrorReport } from "./error-report";
import { findImportPaths } from "./find-import-paths";
import type { importConfig } from "./import-config";
import type { Report } from "./log-tree";
import { makeAst } from "./make-ast";
import type { VerboseLogger } from "./verbose-logger";

export function check(
	logger: VerboseLogger,
	config: Awaited<ReturnType<typeof importConfig>>,
	tsFiles: readonly { relative: string; absolute: string }[],
	root: string,
	scoped: Set<string>,
	errorsRef: /* readwrite */ ErrorReport[],
	reports: /* readwrite */ Report[],
) {
	const end1 = logger.startWithHeader("Check files");

	for (const declaration of config.scopes) {
		const end2 = logger.start(`> "${declaration.scope}" Matched file in scope`);

		const filtered = tsFiles.filter((tsFile) => {
			const end3 = logger.start(`> > "${tsFile.relative}" Match file`);
			if (scoped.has(tsFile.absolute)) {
				end3();
				return;
			}
			const ret = minimatch(tsFile.relative, declaration.scope);
			end3();
			return ret;
		});

		end2();

		for (const path of filtered) {
			const end4 = logger.start(`> > "${path.relative}" Make ast`);

			const makeAstResult = makeAst(path.absolute, errorsRef);
			if (makeAstResult === null) {
				end4();
				return;
			}
			end4();

			const { ast, positions } = makeAstResult;
			const allowed = calcAllowed(root, path.absolute, declaration);

			const end5 = logger.start(`> > "${path.relative}" Find import paths`);
			const infoArray = findImportPaths(ast, positions).map(
				(v): ReturnType<typeof findImportPaths>[number] => {
					const relativePath = `./${relative(root, resolve(dirname(path.absolute), v.path.relative))}`;
					return {
						path: { relative: relativePath },
						line: v.line,
						column: v.column,
					};
				},
			);
			end5();

			const result = infoArray.map((info) => {
				const isAllowed = allowed.reduce((acc, allowedPath): boolean => {
					if (acc) {
						return acc;
					}
					return minimatch(info.path.relative, allowedPath);
				}, false);

				return {
					path: info.path,
					isAllowed,
					line: info.line,
					column: info.column,
				};
			});

			reports.push({ path, result });
			scoped.add(path.absolute);
		}
	}

	end1();
}
