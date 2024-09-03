import { dirname, relative, resolve } from "node:path";

import { findTsFiles } from "./find-ts-files";
import { importConfig } from "./import-config";
import { loadGitignore } from "./load-gitignore";
import { outputFromTree } from "./log-reports";
import { type ErrorReport } from "./error-report";
import { check } from "./check";
import { buildTree, type Report } from "./log-tree";
import { ownedTimeSpan } from "./owned-time-span";
import { VerboseLogger } from "./verbose-logger";

export async function main(): Promise<boolean> {
  const end = ownedTimeSpan();

  const args = process.argv.slice(2);
  const cwd = process.cwd();

  const needsReportUnscoped = args.includes("--unscoped");
  const verbose = args.includes("--verbose");
  const logger = new VerboseLogger(verbose);

  const absolutePath = ((): ReturnType<typeof resolve> => {
    const end_ = logger.start("Resolve config path");
    const configPath = args[0] ?? "";
    if (configPath === "") {
      throw new Error("Configuration file not found");
    }
    const ret = resolve(cwd, configPath);
    end_();
    return ret;
  })();

  const config = await importConfig(logger, absolutePath);

  const end_ = logger.start("Find TypeScript files");
  const root = dirname(absolutePath);
  const tsFiles = ((): readonly string[] => {
    const ig = loadGitignore(root);
    return findTsFiles(root, ig);
  })().map((v) => {
    return {
      relative: `./${relative(root, v)}`,
      absolute: resolve(root, v),
    };
  });
  end_();

  const scoped = new Set<string>();
  const errorsRef = [] as ErrorReport[];
  const reports = [] as Report[];

  check(logger, config, tsFiles, root, scoped, errorsRef, reports);

  const duration = end();

  const restrictedImports = reports
    .flatMap((v) => v.result)
    .filter((v) => !v.isAllowed).length;

  outputFromTree(
    buildTree(
      errorsRef,
      reports,
      tsFiles,
      scoped,
      needsReportUnscoped,
      duration,
      restrictedImports,
    ),
  );

  return restrictedImports === 0;
}
