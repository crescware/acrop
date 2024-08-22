import { minimatch } from "minimatch";
import { dirname, relative, resolve } from "node:path";
import timeSpan from "time-span";

import { findImportPaths } from "./find-import-paths";
import { findTsFiles } from "./find-ts-files";
import { importConfig } from "./import-config";
import { loadGitignore } from "./load-gitignore";
import { makeAst } from "./make-ast";
import { logReports, type Report } from "./log-reports";

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

  config.scopes.forEach((declaration) => {
    const filteredTsFiles = relativeTsFiles
      .filter((tsFile) => minimatch(tsFile, declaration.scope))
      .map((v) => resolve(root, v));

    filteredTsFiles.forEach((tsPath) => {
      if (scoped.has(tsPath)) {
        return;
      }

      const { ast, positions } = makeAst(tsPath);

      const infoArray = findImportPaths(ast, positions).map(
        (v): ReturnType<typeof findImportPaths>[number] => {
          return {
            path: `./${relative(root, resolve(dirname(tsPath), v.path))}`,
            line: v.line,
            column: v.column,
          };
        },
      );

      const result = infoArray.flatMap((info) => {
        if (
          typeof declaration.allowed === "object" &&
          Array.isArray(declaration.allowed)
        ) {
          const allowed = [
            ...declaration.allowed,
            (declaration.disallowSiblingImportsUnlessAllow ?? false)
              ? null
              : `./${relative(root, dirname(tsPath))}/**/*`,
          ]
            .filter((v) => v !== null)
            // Add a glob pattern that allows the directory itself to include index.ts
            .flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, "")]);

          return allowed.reduce(
            (acc, allowedPath) => {
              if (minimatch(info.path, allowedPath)) {
                acc.isAllowed = true;
              }
              return acc;
            },
            {
              path: info.path,
              isAllowed: false,
              line: info.line,
              column: info.column,
            },
          );
        }

        if (
          typeof declaration.allowed === "function" &&
          (declaration as any).matchPattern !== undefined &&
          (declaration as any).matchPattern !== null
        ) {
          const allowed = [
            ...(declaration.allowed(
              `./${relative(root, dirname(tsPath))}`,
            ) as string[]),
            (declaration.disallowSiblingImportsUnlessAllow ?? false)
              ? null
              : `./${relative(root, dirname(tsPath))}/**/*`,
          ]
            .filter((v) => v !== null)
            // Add a glob pattern that allows the directory itself to include index.ts
            .flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, "")]);

          return allowed.reduce(
            (acc, allowedPath) => {
              if (minimatch(info.path, allowedPath)) {
                acc.isAllowed = true;
              }
              return acc;
            },
            {
              path: info.path,
              isAllowed: false,
              line: info.line,
              column: info.column,
            },
          );
        }

        return [];
      });

      reports.push({ tsPath, result });
      scoped.add(tsPath);
    });
  });

  logReports(root, reports, relativeTsFiles, needsReportUnscoped, scoped, end);

  const restrictedImports = reports
    .flatMap((v) => v.result)
    .filter((v) => !v.isAllowed).length;

  return restrictedImports === 0;
}
