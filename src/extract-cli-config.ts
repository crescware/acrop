import arg from "arg";

type CliConfig = Readonly<{
	needsReportUnscoped: boolean;
	verbose: boolean;
	configPath: string;
}>;

export function extractCliConfig(): CliConfig {
	const parsed = arg(
		{ "--unscoped": Boolean, "--verbose": Boolean },
		{ argv: process.argv.slice(2), permissive: false },
	);

	const configPath = parsed._[0] as string | undefined;
	if (configPath === "" || typeof configPath === "undefined") {
		throw new Error("Configuration file not found");
	}

	return {
		needsReportUnscoped: Boolean(parsed["--unscoped"]),
		verbose: Boolean(parsed["--verbose"]),
		configPath,
	};
}
