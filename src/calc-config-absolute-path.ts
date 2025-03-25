import { resolve } from "node:path";

import type { VerboseLogger } from "./verbose-logger";

export function calcConfigAbsolutePath(
	logger: VerboseLogger,
	configPath: string,
): ReturnType<typeof resolve> {
	const end_ = logger.start("Resolve config path");
	const cwd = process.cwd();
	const ret = resolve(cwd, configPath);
	end_();
	return ret;
}
