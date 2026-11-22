import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { type StaticImport, parseSync } from "oxc-parser";

import type { ErrorReport } from "./error-report";

type Return = Readonly<{
	imports: readonly StaticImport[];
	code: string;
}> | null;

export function parseImports(path: string, errorsRef: ErrorReport[]): Return {
	const code = readFileSync(path, "utf-8");

	const result = parseSync(basename(path), code, {
		sourceType: "module",
	});

	if (0 < result.errors.length) {
		errorsRef.push({
			path,
			errors: result.errors.map((error) => error.message),
		});
		return null;
	}

	// `result.program` is deliberately not read. The parser hands the tree over
	// as JSON, and decoding it costs far more than the parse itself. The module
	// record lists the import declarations at the top level of the file.
	return { imports: result.module.staticImports, code };
}
