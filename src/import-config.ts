import { transformFileSync } from "@babel/core";
import { flatten, type InferOutput, safeParse } from "valibot";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { config$ } from "./config";

export async function importConfig(
  path: string,
): Promise<InferOutput<typeof config$>["default"]> {
  if (!existsSync(path)) {
    throw new Error(`Configuration file not found at: ${path}`);
  }

  const result = transformFileSync(path, {
    presets: ["@babel/preset-typescript"],
    filename: path,
    sourceMaps: false,
  });
  const code = result?.code ?? "";

  const tempConfigPath = resolve(tmpdir(), `acrop-${Date.now()}.js`);
  let mod: unknown;
  try {
    writeFileSync(tempConfigPath, code);
    mod = (await import(tempConfigPath)) as unknown;
  } finally {
    unlinkSync(tempConfigPath);
  }

  const parseResult = safeParse(config$, mod);

  if (!parseResult.success) {
    console.log(flatten(parseResult.issues));
    throw new Error();
  }

  return parseResult.output.default;
}
