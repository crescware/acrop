import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { transform } from "oxc-transform";
import { type InferOutput, flatten, safeParse } from "valibot";

import type { VerboseLogger } from "../verbose-logger";
import { config$ } from "./config";

const ext = ".mjs";

export async function importConfig(
	logger: VerboseLogger,
	path: string,
): Promise<InferOutput<typeof config$>["default"]> {
	const end1 = logger.startWithHeader("Import config");

	if (!existsSync(path)) {
		throw new Error(`Configuration file not found at: ${path}`);
	}

	const end2 = logger.start("> Transform config file");
	const result = transform(path, readFileSync(path, "utf-8"));
	if (0 < result.errors.length) {
		throw new Error(
			[
				`Failed to transform configuration file at: ${path}`,
				...result.errors.map((error) => error.codeframe ?? error.message),
			].join("\n"),
		);
	}
	end2();

	const end3 = logger.start("> Write js config file");
	const tempConfigPath = resolve(
		tmpdir(),
		`acrop-${crypto.randomUUID()}${ext}`,
	);

	let mod: unknown;
	try {
		writeFileSync(tempConfigPath, result.code);
		mod = (await import(tempConfigPath)) as unknown;
	} finally {
		unlinkSync(tempConfigPath);
	}
	end3();

	const parseResult = safeParse(config$, mod);

	if (!parseResult.success) {
		console.info(flatten(parseResult.issues));
		throw new Error();
	}

	const ret = parseResult.output.default;

	end1();
	return ret;
}
