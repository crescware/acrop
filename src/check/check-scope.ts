import type { Report } from "../log-tree";
import type { UnmatchedPatternsTracker } from "../unmatched-pattern-tracker";
import type { VerboseLogger } from "../verbose-logger";
import { analyzeImportAccess } from "./analyze-import-access";
import { calcRules } from "./calc-rules";
import type { ErrorReport } from "./error-report";
import { findImportPaths } from "./find-import-paths";
import { makeImportResolver } from "./make-import-resolver";
import { makeLocator } from "./make-locator";
import { parseImports } from "./parse-imports";

// A larger batch is no faster, and every file in a batch keeps its source and
// its parse result in memory until the batch has been checked.
const parseBatchSize = 64;

export async function checkScope(
	logger: VerboseLogger,
	declaration: Parameters<typeof calcRules>[2],
	filtered: readonly { relative: string; absolute: string }[],
	root: string,
	scoped: Set<string>,
	errorsRef: /* readwrite */ ErrorReport[],
	reports: /* readwrite */ Report[],
	trackerRef: UnmatchedPatternsTracker,
): Promise<void> {
	for (let i = 0; i < filtered.length; i += parseBatchSize) {
		const batch = await Promise.all(
			filtered.slice(i, i + parseBatchSize).map(async (path) => {
				const end3 = logger.start(`> > "${path.relative}" Make ast`);
				const parsed = await parseImports(path.absolute);
				end3();
				return { path, parsed };
			}),
		);

		// Checking in the order of `filtered` keeps the report in that order.
		for (const { path, parsed } of batch) {
			if ("errors" in parsed) {
				errorsRef.push({ path: path.absolute, errors: parsed.errors });
				continue;
			}

			const { imports, code } = parsed;
			const rules = calcRules(root, path.absolute, declaration, trackerRef);

			const end4 = logger.start(`> > "${path.relative}" Find import paths`);
			const resolveImport = makeImportResolver(root, path.absolute);
			const infoArray = findImportPaths(imports).map(
				(v): ReturnType<typeof findImportPaths>[number] => {
					return {
						path: { relative: resolveImport(v.path.relative) },
						start: v.start,
					};
				},
			);
			end4();

			const analyzed = analyzeImportAccess(
				logger,
				rules,
				infoArray,
				trackerRef,
				makeLocator(code),
			);

			reports.push({ path, result: analyzed });
			scoped.add(path.absolute);
		}
	}
}
