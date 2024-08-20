import { minimatch } from 'minimatch';
import { dirname, relative, resolve } from 'node:path';

import { findImportPaths } from './find-import-paths';
import { findTsFiles } from './find-ts-files';
import { importConfig } from './import-config';
import { loadGitignore } from './load-gitignore';
import { makeAst } from './make-ast';
import { outputReport } from './output-report';

export async function main(): Promise<void> {
  const args = process.argv.slice(2);

  const cwd = process.cwd();

  const absolutePath = ((): ReturnType<typeof resolve> => {
    const configPath = args[0] ?? '';
    return resolve(cwd, configPath);
  })();

  const needsReportUnscoped = args.includes('--report-unscoped');

  const config = await importConfig(absolutePath);
  const root = resolve(cwd, config.root);

  const ig = loadGitignore(root);
  const relativeTsFiles = findTsFiles(root, ig).map(
    (v) => `./${relative(root, v)}`,
  );

  const scoped = new Set<string>();

  config.scopes.forEach((declaration) => {
    const filteredTsFiles = relativeTsFiles
      .filter((tsFile) => minimatch(tsFile, declaration.scope))
      .map((v) => resolve(root, v));

    filteredTsFiles.forEach((tsPath) => {
      if (scoped.has(tsPath)) {
        return;
      }

      const ast = makeAst(tsPath);

      const infoArray = findImportPaths(ast).map(
        (v): ReturnType<typeof findImportPaths>[number] => {
          return {
            path: `./${relative(root, resolve(dirname(tsPath), v.path))}`,
            line: v.line,
            column: v.column,
          };
        },
      );

      const result = infoArray
        .flatMap((info) => {
          if (
            typeof declaration.allowed === 'object' &&
            Array.isArray(declaration.allowed)
          ) {
            const allowed = [
              ...declaration.allowed,
              (declaration.disallowSiblingImportsUnlessAllow ?? false)
                ? null
                : `./${relative(root, dirname(tsPath))}/**/*`,
            ]
              .filter((v) => v !== null)
              // index.ts を許容するためにそのディレクトリ自身も許容する glob を追加
              .flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, '')]);

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
            typeof declaration.allowed === 'function' &&
            (declaration as any).matchPattern !== undefined &&
            (declaration as any).matchPattern !== null
          ) {
            const pattern = (declaration as any)
              .matchPattern as unknown as RegExp;
            const matched = `./${relative(root, dirname(tsPath))}`.match(
              pattern,
            );

            const allowed = [
              ...(declaration.allowed(matched) as string[]),
              (declaration.disallowSiblingImportsUnlessAllow ?? false)
                ? null
                : `./${relative(root, dirname(tsPath))}/**/*`,
            ]
              .filter((v) => v !== null)
              // index.ts を許容するためにそのディレクトリ自身も許容する glob を追加
              .flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, '')]);

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
        })
        .filter((v) => !v.isAllowed);

      outputReport(`./${relative(root, tsPath)}`, result);
      scoped.add(tsPath);
    });
  });

  if (needsReportUnscoped) {
    relativeTsFiles
      .filter((v) => !scoped.has(resolve(root, v)))
      .forEach((v) => console.log(v));
  }
}
