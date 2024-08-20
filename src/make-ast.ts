import { parse } from "@babel/parser";
import { readFileSync } from "node:fs";
import { extname } from "node:path";

type Plugins = NonNullable<Parameters<typeof parse>[1]>["plugins"];

export function makeAst(path: string): ReturnType<typeof parse> {
  const code = readFileSync(path, "utf-8");
  const ext = extname(path);

  const basePlugins = ["typescript"] as const satisfies Plugins;

  return parse(code, {
    sourceType: "module",
    plugins: ext === ".tsx" ? [...basePlugins, "jsx"] : basePlugins,
  });
}
