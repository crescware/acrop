import { dirname, relative, resolve } from "node:path";
import timeSpan from "time-span";

import { findTsFiles } from "./find-ts-files";
import { importConfig } from "./import-config";
import { loadGitignore } from "./load-gitignore";
import { outputFromTree } from "./log-reports";
import { type ErrorReport } from "./error-report";
import { check } from "./check";
import { buildTree, type Report } from "./log-tree";

export async function main(): Promise<boolean> {
  const end = timeSpan();

  const args = process.argv.slice(2);
  const cwd = process.cwd();

  const needsReportUnscoped = args.includes("--unscoped");

  const absolutePath = ((): ReturnType<typeof resolve> => {
    const configPath = args[0] ?? "";
    if (configPath === "") {
      throw new Error("Configuration file not found");
    }
    return resolve(cwd, configPath);
  })();

  const config = await importConfig(absolutePath);

  const root = dirname(absolutePath);
  const relativeTsFiles = ((): readonly string[] => {
    const ig = loadGitignore(root);
    return findTsFiles(root, ig).map((v) => `./${relative(root, v)}`);
  })();

  const scoped = new Set<string>();
  const errorsRef = [] as ErrorReport[];
  const reports = [] as Report[];

  check(config, relativeTsFiles, root, scoped, errorsRef, reports);

  const duration = end();

  const restrictedImports = reports
    .flatMap((v) => v.result)
    .filter((v) => !v.isAllowed).length;

  outputFromTree(
    buildTree(
      errorsRef,
      reports,
      root,
      relativeTsFiles,
      scoped,
      needsReportUnscoped,
      duration,
      restrictedImports,
    ),
  );

  return restrictedImports === 0;
}
