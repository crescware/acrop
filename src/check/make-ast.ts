import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { parseSync } from "oxc-parser";
import { type InferOutput, parse } from "valibot";

import { getLineStartPositions } from "../get-line-start-positions";
import { ast$ } from "./ast";
import type { ErrorReport } from "./error-report";

type Return = Readonly<{
	ast: InferOutput<typeof ast$>;
	positions: ReturnType<typeof getLineStartPositions>;
}> | null;

export function makeAst(path: string, errorsRef: ErrorReport[]): Return {
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

	const positions = getLineStartPositions(code);

	return { ast: parse(ast$, result.program), positions };
}
