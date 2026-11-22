import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { type StaticImport, parseAsync } from "oxc-parser";

export type ParsedImports = Readonly<{
	imports: readonly StaticImport[];
	code: string;
}>;

type SyntaxErrors = Readonly<{
	errors: readonly string[];
}>;

/**
 * Resolves with the import declarations of a file, or with the parser's
 * messages when the file has syntax errors. The parser runs on Node's thread
 * pool, so files that are parsed at the same time are parsed in parallel.
 */
export async function parseImports(
	path: string,
): Promise<ParsedImports | SyntaxErrors> {
	const code = readFileSync(path, "utf-8");

	const result = await parseAsync(basename(path), code, {
		sourceType: "module",
	});

	if (0 < result.errors.length) {
		return { errors: result.errors.map((error) => error.message) };
	}

	// `result.program` is deliberately not read. The parser hands the tree over
	// as JSON, and decoding it costs far more than the parse itself. The module
	// record lists the import declarations at the top level of the file.
	return { imports: result.module.staticImports, code };
}
