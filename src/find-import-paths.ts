import { InferOutput } from "valibot";

import { makeAst } from "./make-ast";
import { isImportDeclaration, node$ } from "./ast";
import { calcLineNumber } from "./calc-line-number";

type ImportInfo = Readonly<{
  path: string;
  line: number;
  column: number;
}>;

export function findImportPaths(
  ast: ReturnType<typeof makeAst>["ast"],
  positions_: ReturnType<typeof makeAst>["positions"],
): readonly ImportInfo[] {
  const importInfos: ImportInfo[] = [];

  function traverse(
    node: InferOutput<typeof node$>,
    positions: ReturnType<typeof makeAst>["positions"],
  ): void {
    if (isImportDeclaration(node)) {
      const { line, column } = calcLineNumber(positions, node.start + 1);
      importInfos.push({
        path: node.source.value,
        line,
        column,
      });
      return;
    }

    if ("body" in node && Array.isArray(node.body)) {
      node.body.forEach((v) => traverse(v, positions_));
      return;
    }

    // noop
  }

  ast.body.forEach((v) => traverse(v, positions_));

  return importInfos as readonly ImportInfo[];
}
