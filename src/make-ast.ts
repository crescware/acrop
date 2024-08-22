import { parseSync } from "oxc-parser";
import { readFileSync } from "node:fs";
import { InferOutput, parse } from "valibot";

import { ast$ } from "./ast";
import { getLineStartPositions } from "./get-line-start-positions";

type Return = Readonly<{
  ast: InferOutput<typeof ast$>;
  positions: ReturnType<typeof getLineStartPositions>;
}>;

export function makeAst(path: string): Return {
  const code = readFileSync(path, "utf-8");
  const result = parseSync(code, { sourceType: "module" });
  const ast = JSON.parse(result.program);

  const positions = getLineStartPositions(code);

  return { ast: parse(ast$, ast), positions };
}
