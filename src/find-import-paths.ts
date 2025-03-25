import type { InferOutput } from "valibot";

import { isImportDeclaration, type node$ } from "./ast";
import { calcLineNumber } from "./calc-line-number";
import type { makeAst } from "./make-ast";

type Ast = NonNullable<ReturnType<typeof makeAst>>["ast"];
type Positions = NonNullable<ReturnType<typeof makeAst>>["positions"];

type ImportInfo = Readonly<{
	path: Readonly<{
		relative: string;
	}>;
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
			importInfos.push({
				path: { relative: node.source.value },
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
