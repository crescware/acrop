import { InferOutput, NonNullable } from "valibot";

import { makeAst } from "./make-ast";
import { isImportDeclaration, node$ } from "./ast";
import { calcLineNumber } from "./calc-line-number";

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
      node.body.forEach((v) => traverse(v, positions_));
      return;
    }

    // noop
  }

  ast.body.forEach((v) => traverse(v, positions_));

  return importInfos as readonly ImportInfo[];
}
