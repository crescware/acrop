import { minimatch } from "minimatch";
import { dirname, relative, resolve } from "node:path";
import timeSpan from "time-span";

import { calcAllowed } from "./calc-allowed";
import { findImportPaths } from "./find-import-paths";
import { findTsFiles } from "./find-ts-files";
import { importConfig } from "./import-config";
import { loadGitignore } from "./load-gitignore";
import { ErrorReport, logErrors, logReports, type Report } from "./log-reports";
import { makeAst } from "./make-ast";

export async function main(): Promise<boolean> {
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

  const end = timeSpan();
  const config = await importConfig(absolutePath);
  const root = dirname(absolutePath);

  const ig = loadGitignore(root);
  const relativeTsFiles = findTsFiles(root, ig).map(
    (v) => `./${relative(root, v)}`,
  );

  const scoped = new Set<string>();
  const reports = [] as Report[];
  const errorsRef = [] as ErrorReport[];

  config.scopes.forEach((declaration) => {
    const filteredTsFiles = relativeTsFiles
      .filter((tsFile) => minimatch(tsFile, declaration.scope))
      .map((v) => resolve(root, v));

    filteredTsFiles.forEach((tsPath) => {
      if (scoped.has(tsPath)) {
        return;
      }

      const makeAstResult = makeAst(tsPath, errorsRef);
      if (makeAstResult === null) {
        return;
      }

      const { ast, positions } = makeAstResult;
      const allowed = calcAllowed(root, tsPath, declaration);

      const infoArray = findImportPaths(ast, positions).map(
        (v): ReturnType<typeof findImportPaths>[number] => {
          return {
            path: `./${relative(root, resolve(dirname(tsPath), v.path))}`,
            line: v.line,
            column: v.column,
          };
        },
      );

      const result = infoArray.map((info) => {
        const isAllowed = allowed.reduce((acc, allowedPath): boolean => {
          if (acc) {
            return acc;
          }
          return minimatch(info.path, allowedPath);
        }, false);

        return {
          path: info.path,
          isAllowed,
          line: info.line,
          column: info.column,
        };
      });

      reports.push({ tsPath, result });
      scoped.add(tsPath);
    });
  });

  logErrors(errorsRef);
  logReports(root, reports, relativeTsFiles, needsReportUnscoped, scoped, end);

  const restrictedImports = reports
    .flatMap((v) => v.result)
    .filter((v) => !v.isAllowed).length;

  return restrictedImports === 0;
}
