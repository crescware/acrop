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

	const { scoped, errorsRef, reports, hasOnlyScopes } = check(
		logger,
		config,
		tsFiles,
		root,
	);

	const duration = end();

	const restrictedImports = reports
		.flatMap((v) => v.result)
		.filter((v) => !v.isAllowed).length;

	outputFromTree(
		buildTree(
			errorsRef,
			reports,
			tsFiles,
			scoped,
			needsReportUnscoped,
			duration,
			restrictedImports,
		),
	);

	if (hasOnlyScopes) {
		console.info(`Failed due to "only: true" flag`);
		return false;
	}

	return restrictedImports === 0;
}
