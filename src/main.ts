import { dirname, relative, resolve } from "node:path";

import { check } from "./check";
import { findTsFiles } from "./find-ts-files";
import { importConfig } from "./import-config";
import { loadGitignore } from "./load-gitignore";
import { outputFromTree } from "./log-reports";
import { buildTree } from "./log-tree";
import { ownedTimeSpan } from "./owned-time-span";
import { VerboseLogger } from "./verbose-logger";

type CliConfig = Readonly<{
	needsReportUnscoped: boolean;
	verbose: boolean;
	configPath: string;
}>;

function extractCliConfig(): CliConfig {
	const args = process.argv.slice(2);

	const needsReportUnscoped = args.includes("--unscoped");
	const verbose = args.includes("--verbose");

	const configPath = args[0] ?? "";
	if (configPath === "") {
		throw new Error("Configuration file not found");
	}

	return { needsReportUnscoped, verbose, configPath };
}

function calcConfigAbsolutePath(
	logger: VerboseLogger,
	configPath: string,
): ReturnType<typeof resolve> {
	const end_ = logger.start("Resolve config path");
	const cwd = process.cwd();
	const ret = resolve(cwd, configPath);
	end_();
	return ret;
}

function getAllTsFiles(
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

	const { scoped, errorsRef, reports } = check(logger, config, tsFiles, root);

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

	return restrictedImports === 0;
}
