import { minimatch } from "minimatch";
import { dirname, relative, resolve } from "node:path";

import { importConfig } from "./import-config";
import { type ErrorReport } from "./error-report";
import { makeAst } from "./make-ast";
import { calcAllowed } from "./calc-allowed";
import { findImportPaths } from "./find-import-paths";
import { type Report } from "./log-tree";

export function check(
  config: Awaited<ReturnType<typeof importConfig>>,
  relativeTsFiles: readonly string[],
  root: string,
  scoped: Set<string>,
  errorsRef: /* readwrite */ ErrorReport[],
  reports: /* readwrite */ Report[],
) {
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

      reports.push({
        tsPath: { relative: relative(root, tsPath), absolute: tsPath },
        result,
      });
      scoped.add(tsPath);
    });
  });
}
