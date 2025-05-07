import type { InferOutput } from "valibot";

import { calcLineNumber } from "../calc-line-number";
import type { Path } from "../path-utils";
import { isImportDeclaration, type node$ } from "./ast";
import type { makeAst } from "./make-ast";

type Ast = NonNullable<ReturnType<typeof makeAst>>["ast"];
type Positions = NonNullable<ReturnType<typeof makeAst>>["positions"];

type ImportInfo = Readonly<{
	path: Path;
	line: number;
	column: number;
}>;

export function findImportPaths(
	ast: Ast,
	positions_: Positions,
): readonly ImportInfo[] {
	const importInfos: ImportInfo[] = [];

	function traverse(
		node: InferOutput<typeof node$>,
		positions: Positions,
	): void {
		if (isImportDeclaration(node)) {
			const { line, column } = calcLineNumber(positions, node.source.start + 1);
			const raw = node.source.value;
			const internal = raw.startsWith("./") || raw.startsWith("../");

			importInfos.push({
				path: internal
					? { type: "internal", relative: raw }
					: { type: "external", name: raw },
				line,
				column,
			});
			return;
		}

		if ("body" in node && Array.isArray(node.body)) {
			for (const v of node.body) {
				traverse(v, positions_);
			}
			return;
		}

		// noop
	}

	for (const v of ast.body) {
		traverse(v, positions_);
	}

	return importInfos as readonly ImportInfo[];
}
