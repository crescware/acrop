import { transformFileSync } from "@babel/core";
import { flatten, type InferOutput, safeParse } from "valibot";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { config$ } from "./config";
import { VerboseLogger } from "./verbose-logger";

const ext = ".mjs";

export async function importConfig(
  logger: VerboseLogger,
  path: string,
): Promise<InferOutput<typeof config$>["default"]> {
  const end1 = logger.startWithHeader("Import config");

  if (!existsSync(path)) {
    throw new Error(`Configuration file not found at: ${path}`);
  }

  const end2 = logger.start("> Transform config file");
  const result = transformFileSync(path, {
    presets: ["@babel/preset-typescript"],
    filename: path,
    sourceMaps: false,
  });
  const code = result?.code ?? "";
  end2();

  const end3 = logger.start("> Write js config file");
  const tempConfigPath = resolve(
    tmpdir(),
    `acrop-${crypto.randomUUID()}${ext}`,
  );

  let mod: unknown;
  try {
    writeFileSync(tempConfigPath, code);
    mod = (await import(tempConfigPath)) as unknown;
  } finally {
    unlinkSync(tempConfigPath);
  }
  end3();

  const parseResult = safeParse(config$, mod);

  if (!parseResult.success) {
    console.log(flatten(parseResult.issues));
    throw new Error();
  }

  const ret = parseResult.output.default;

  end1();
  return ret;
}
