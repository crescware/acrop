import { dirname, relative, resolve } from "node:path";
import timeSpan from "time-span";

import { findTsFiles } from "./find-ts-files";
import { importConfig } from "./import-config";
import { loadGitignore } from "./load-gitignore";
import { logReports, type Report } from "./log-reports";
import { ErrorReport } from "./error-report";
import { buildNodes } from "./log-tree/build-nodes";
import { check } from "./check";

export async function main(): Promise<boolean> {
  const end = timeSpan();
  const args = process.argv.slice(2);

  const cwd = process.cwd();

  const absolutePath = ((): ReturnType<typeof resolve> => {
    const configPath = args[0] ?? "";
    if (configPath === "") {
      throw new Error("Configuration file not found");
    }
    return resolve(cwd, configPath);
  })();

  const needsReportUnscoped = args.includes("--unscoped");

  const root = dirname(absolutePath);

  const relativeTsFiles = ((): readonly string[] => {
    const ig = loadGitignore(root);
    return findTsFiles(root, ig).map((v) => `./${relative(root, v)}`);
  })();

  const scoped = new Set<string>();
  const reports = [] as Report[];
  const errorsRef = [] as ErrorReport[];

  const config = await importConfig(absolutePath);
  check(config, relativeTsFiles, root, scoped, errorsRef, reports);

  const duration = end();

  const restrictedImports = reports
    .flatMap((v) => v.result)
    .filter((v) => !v.isAllowed).length;

  const nodes = buildNodes(
    errorsRef,
    reports,
    root,
    relativeTsFiles,
    scoped,
    needsReportUnscoped,
    duration,
    restrictedImports,
  );

  logReports(nodes);

  return restrictedImports === 0;
}
