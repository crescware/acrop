import { dirname } from "node:path";

import { calcConfigAbsolutePath } from "./calc-config-absolute-path";
import { check } from "./check/check";
import { extractCliConfig } from "./extract-cli-config";
import { getAllTsFiles } from "./get-all-ts-files";
import { importConfig } from "./import-config";
import { outputFromTree } from "./log-reports";
import { buildTree } from "./log-tree";
import { ownedTimeSpan } from "./owned-time-span";
import { UnmatchedPatternsTracker } from "./unmatched-pattern-tracker";
import { VerboseLogger } from "./verbose-logger";

export async function main(): Promise<boolean> {
	const end = ownedTimeSpan();

	const cliConfig = extractCliConfig();
	const logger = new VerboseLogger(cliConfig.verbose);
	const configPath = calcConfigAbsolutePath(logger, cliConfig.configPath);
	const root = dirname(configPath);
	const config = await importConfig(logger, configPath);
	const tsFiles = getAllTsFiles(logger, root);

	const onlyScopes = config.scopes.filter((scope) => scope.only);
	const hasOnlyScopes = 0 < onlyScopes.length;
	const scopeDeclarations = hasOnlyScopes ? onlyScopes : config.scopes;

	if (hasOnlyScopes) {
		console.info(
			`Found ${onlyScopes.length} scope(s) with "only: true", processing only these scopes`,
		);
		console.info(""); // blank
	}

	const tracker = new UnmatchedPatternsTracker();

	const { scoped, errorsRef, reports } = check(
		logger,
		scopeDeclarations,
		tsFiles,
		root,
		tracker,
	);

	let unmatchedPatternsCount = 0;
	if (cliConfig.unmatchedPatterns.needsCheck) {
		const unmatchedPatterns = tracker.getUnmatchedPatterns();
		unmatchedPatternsCount = unmatchedPatterns.length;
		if (0 < unmatchedPatternsCount) {
			console.info(""); // blank
			console.info(
				`Found ${unmatchedPatternsCount} unused pattern(s) defined in rules:`,
			);
			// biome-ignore lint/complexity/noForEach: <explanation>
			unmatchedPatterns.forEach((p) => {
				console.info(
					`  - ${p.scopeLabel} (rule[${p.ruleIndex.toString()}]): ${p.pattern}`,
				);
			});
			console.info(""); // blank

			if (cliConfig.unmatchedPatterns.shouldFail) {
				console.info(
					`Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.`,
				);
				console.info(""); // blank
			}
		}
	}

	const duration = end();

	const restrictedImports = reports
		.flatMap((v) => v.result)
		.filter((v) => !v.isAllowed).length;

	const tree = buildTree(
		errorsRef,
		reports,
		tsFiles,
		scoped,
		cliConfig.needsReportUnscoped,
		duration,
		restrictedImports,
	);

	outputFromTree(tree);

	if (hasOnlyScopes) {
		console.info(`Failed due to "only: true" flag`);
		return false;
	}

	if (0 < unmatchedPatternsCount && cliConfig.unmatchedPatterns.shouldFail) {
		return false;
	}

	return restrictedImports === 0;
}
