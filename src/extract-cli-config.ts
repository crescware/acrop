type CliConfig = Readonly<{
	needsReportUnscoped: boolean;
	verbose: boolean;
	configPath: string;
}>;

export function extractCliConfig(): CliConfig {
	const args = process.argv.slice(2);

	const needsReportUnscoped = args.includes("--unscoped");
	const verbose = args.includes("--verbose");

	const configPath = args[0] ?? "";
	if (configPath === "") {
		throw new Error("Configuration file not found");
	}

	return { needsReportUnscoped, verbose, configPath };
}
