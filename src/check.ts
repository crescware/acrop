import { dirname, relative, resolve } from "node:path";
import { minimatch } from "minimatch";

import { calcRules } from "./calc-rules";
import type { ErrorReport } from "./error-report";
import { findImportPaths } from "./find-import-paths";
import type { importConfig } from "./import-config";
import type { Report } from "./log-tree";
import { makeAst } from "./make-ast";
import type { VerboseLogger } from "./verbose-logger";

type Return = Readonly<{
	scoped: Set<string>;
	errorsRef: readonly ErrorReport[];
	reports: readonly Report[];
}>;

export function check(
	logger: VerboseLogger,
	config: Awaited<ReturnType<typeof importConfig>>,
	tsFiles: readonly { relative: string; absolute: string }[],
	root: string,
): Return {
	const end1 = logger.startWithHeader("Check files");

	const scoped = new Set<string>();
	const errorsRef = [] as ErrorReport[];
	const reports = [] as Report[];

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
				continue;
			}
			end4();

			const { ast, positions } = makeAstResult;
			const rules = calcRules(root, path.absolute, declaration);

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
				let isAllowed = false;
				let matchFound = false;

				for (const rule of rules) {
					if (minimatch(info.path.relative, rule.pattern)) {
						isAllowed = rule.type === "allowed";
						matchFound = true;
						break;
					}
				}

				if (!matchFound) {
					isAllowed = false;
				}

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

	return { scoped, errorsRef, reports };
}
