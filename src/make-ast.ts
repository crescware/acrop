import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { parseSync } from "oxc-parser";
import { InferOutput, parse } from "valibot";

import { ast$ } from "./ast";
import { getLineStartPositions } from "./get-line-start-positions";

type Return = Readonly<{
  ast: InferOutput<typeof ast$>;
  positions: ReturnType<typeof getLineStartPositions>;
}> | null;

export function makeAst(path: string, errorsRef: unknown[]): Return {
  const code = readFileSync(path, "utf-8");

  const result = parseSync(code, {
    sourceType: "module",
    sourceFilename: basename(path),
  });

  if (0 < result.errors.length) {
    errorsRef.push({ path, errors: result.errors });
    return null;
  }

  const ast = JSON.parse(result.program);
  const positions = getLineStartPositions(code);

  return { ast: parse(ast$, ast), positions };
}
