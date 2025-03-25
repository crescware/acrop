import { dirname } from "node:path";

import { calcConfigAbsolutePath } from "./calc-config-absolute-path";
import { check } from "./check/check";
import { extractCliConfig } from "./extract-cli-config";
import { getAllTsFiles } from "./get-all-ts-files";
import { importConfig } from "./import-config";
import { outputFromTree } from "./log-reports";
import { buildTree } from "./log-tree";
import { ownedTimeSpan } from "./owned-time-span";
import { VerboseLogger } from "./verbose-logger";

export async function main(): Promise<boolean> {
	const end = ownedTimeSpan();

	const {
		needsReportUnscoped,
		verbose,
		configPath: unresolvedConfigPath,
	} = extractCliConfig();

	const logger = new VerboseLogger(verbose);

	const configPath = calcConfigAbsolutePath(logger, unresolvedConfigPath);
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

	const { scoped, errorsRef, reports } = check(
		logger,
		scopeDeclarations,
		tsFiles,
		root,
	);

	const duration = end();

	const restrictedImports = reports
		.flatMap((v) => v.result)
		.filter((v) => !v.isAllowed).length;

	const tree = buildTree(
		errorsRef,
		reports,
		tsFiles,
		scoped,
		needsReportUnscoped,
		duration,
		restrictedImports,
	);

	outputFromTree(tree);

	if (hasOnlyScopes) {
		console.info(`Failed due to "only: true" flag`);
		return false;
	}

	return restrictedImports === 0;
}
