import { dirname, relative, resolve } from "node:path";
import { minimatch } from "minimatch";

import type { importConfig } from "../import-config";
import type { Report } from "../log-tree";
import type { VerboseLogger } from "../verbose-logger";
import { analyzeImportAccess } from "./analyze-import-access";
import { calcRules } from "./calc-rules";
import type { ErrorReport } from "./error-report";
import { findImportPaths } from "./find-import-paths";
import { makeAst } from "./make-ast";

type Return = Readonly<{
	scoped: Set<string>;
	errorsRef: readonly ErrorReport[];
	reports: readonly Report[];
	hasOnlyScopes: boolean;
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

	const onlyScopes = config.scopes.filter((scope) => scope.only);
	const hasOnlyScopes = 0 < onlyScopes.length;
	const scopeDeclarations = hasOnlyScopes ? onlyScopes : config.scopes;

	if (hasOnlyScopes) {
		console.info(
			`Found ${onlyScopes.length} scope(s) with "only: true", processing only these scopes`,
		);
		console.info(""); // blank
	}

	for (const declaration of scopeDeclarations) {
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

			const analyzed = analyzeImportAccess(logger, rules, infoArray);

			reports.push({ path, result: analyzed });
			scoped.add(path.absolute);
		}
	}

	end1();

	return {
		scoped,
		errorsRef,
		reports,
		hasOnlyScopes,
	};
}
