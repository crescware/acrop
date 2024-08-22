#!/usr/bin/env node
// src/main.ts
import { minimatch } from "minimatch";
import { dirname as dirname2, relative as relative4, resolve as resolve3 } from "node:path";
import timeSpan from "time-span";

// src/calc-allowed.ts
import { dirname, relative } from "node:path";
function calcAllowed(root, tsPath, declaration) {
  const base = (() => {
    if (typeof declaration.allowed === "object" && Array.isArray(declaration.allowed)) {
      return declaration.allowed;
    }
    if (typeof declaration.allowed === "function") {
      return declaration.allowed(`./${relative(root, tsPath)}`);
    }
    throw new Error("invalid");
  })();
  return [
    ...base,
    declaration.disallowSiblingImportsUnlessAllow ?? false ? null : `./${relative(root, dirname(tsPath))}/**/*`
  ].filter((v) => v !== null).flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, "")]);
}

// src/ast.ts
import {
  array,
  integer,
  literal,
  looseObject,
  minValue,
  number,
  object,
  pipe,
  safeParse,
  string,
  union
} from "valibot";
var positionIndex$ = pipe(number(), integer(), minValue(0));
var positionEntries = {
  start: positionIndex$,
  end: positionIndex$
};
var stringLiteral$ = object({
  ...positionEntries,
  type: literal("StringLiteral"),
  value: string()
});
var importDeclaration$ = object({
  ...positionEntries,
  type: literal("ImportDeclaration"),
  source: stringLiteral$
});
function isImportDeclaration(v) {
  return safeParse(importDeclaration$, v).success;
}
var node$ = union([
  importDeclaration$,
  looseObject({
    type: string()
  })
]);
var ast$ = object({
  ...positionEntries,
  type: literal("Program"),
  body: array(node$)
});

// src/calc-line-number/calc-line-number.ts
function calcLineNumber(positions, start) {
  const i = positions.findLastIndex((pos) => pos <= start);
  const column = start - (positions[i] ?? NaN) + 1;
  if (isNaN(column)) {
    throw new Error("invalid");
  }
  return { line: i + 1, column };
}

// src/find-import-paths.ts
function findImportPaths(ast, positions_) {
  const importInfos = [];
  function traverse(node, positions) {
    if (isImportDeclaration(node)) {
      const { line, column } = calcLineNumber(positions, node.source.start + 1);
      importInfos.push({
        path: node.source.value,
        line,
        column
      });
      return;
    }
    if ("body" in node && Array.isArray(node.body)) {
      node.body.forEach((v) => traverse(v, positions_));
      return;
    }
  }
  ast.body.forEach((v) => traverse(v, positions_));
  return importInfos;
}

// src/find-ts-files.ts
import { readdirSync, statSync } from "node:fs";
import { join, relative as relative2 } from "node:path";
function findTsFiles(rootDir, ig) {
  const results = [];
  function searchDir(dir) {
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      if (ig.ignores(relative2(rootDir, fullPath))) {
        continue;
      }
      const stat = statSync(fullPath);
      const isTypeScriptFile = stat.isFile() && (file.endsWith(".ts") || file.endsWith(".tsx"));
      if (stat.isDirectory()) {
        searchDir(fullPath);
      } else if (isTypeScriptFile) {
        results.push(fullPath);
      }
    }
  }
  searchDir(rootDir);
  return results;
}

// src/import-config.ts
import { transformFileSync } from "@babel/core";
import { flatten, safeParse as safeParse2 } from "valibot";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

// src/config.ts
import {
  array as array2,
  boolean,
  function_,
  minLength,
  optional,
  pipe as pipe2,
  strictObject,
  string as string2,
  union as union2
} from "valibot";
var path$ = pipe2(string2(), minLength(1));
var glob$ = pipe2(string2(), minLength(1));
var scope$ = strictObject({
  scope: glob$,
  allowed: union2([pipe2(array2(glob$), minLength(0)), function_()]),
  disallowSiblingImportsUnlessAllow: optional(boolean())
});
var config$ = strictObject({
  default: strictObject({
    root: path$,
    scopes: pipe2(array2(scope$), minLength(0))
  })
});

// src/import-config.ts
var ext = ".mjs";
async function importConfig(path) {
  if (!existsSync(path)) {
    throw new Error(`Configuration file not found at: ${path}`);
  }
  const result = transformFileSync(path, {
    presets: ["@babel/preset-typescript"],
    filename: path,
    sourceMaps: false
  });
  const code = result?.code ?? "";
  const tempConfigPath = resolve(tmpdir(), `acrop-${Date.now()}${ext}`);
  let mod;
  try {
    writeFileSync(tempConfigPath, code);
    mod = await import(tempConfigPath);
  } finally {
    unlinkSync(tempConfigPath);
  }
  const parseResult = safeParse2(config$, mod);
  if (!parseResult.success) {
    console.log(flatten(parseResult.issues));
    throw new Error();
  }
  return parseResult.output.default;
}

// src/load-gitignore.ts
import ignore from "ignore";
import { existsSync as existsSync2, readFileSync } from "node:fs";
import { join as join2 } from "node:path";
function loadGitignore(dir) {
  const gitignorePath = join2(dir, ".gitignore");
  if (existsSync2(gitignorePath)) {
    const content = readFileSync(gitignorePath, "utf-8");
    return ignore().add(content);
  }
  return ignore();
}

// src/log-reports/log-errors.ts
import { red } from "yoctocolors";
function logErrors(errorsRef) {
  errorsRef.forEach((v) => {
    console.log(red(v.path));
    console.log("");
    v.errors.forEach((line) => console.log(line));
  });
}

// src/log-reports/log-reports.ts
import { relative as relative3, resolve as resolve2 } from "node:path";
import { gray as gray3, green, underline as underline2, yellow } from "yoctocolors";
import { getBorderCharacters as getBorderCharacters2, table as table2 } from "table";

// src/log-reports/log-restricted-imports.ts
import { gray } from "yoctocolors";
import { getBorderCharacters, table } from "table";
function logRestrictedImports(results) {
  const matrix = results.map((v) => {
    if (v.isAllowed) {
      return null;
    }
    const lineCol = gray([v.line, v.column].join(":"));
    return [lineCol, v.path];
  }).filter((v) => v !== null);
  const output = table(matrix, {
    border: getBorderCharacters("void"),
    columnDefault: { paddingLeft: 2, paddingRight: 0 },
    drawHorizontalLine: () => false,
    columns: [{ alignment: "left" }, { alignment: "left" }]
  });
  console.log(output);
}

// src/log-reports/log-header.ts
import { gray as gray2, underline } from "yoctocolors";
function logHeader(path, count) {
  const pathPart = gray2(underline(path));
  const countPart = gray2(`(${count})`);
  const header = [pathPart, countPart].join(" ");
  console.log(header);
}

// src/log-reports/log-report.ts
function logReport(targetPath, results) {
  if (results.length === 0) {
    return;
  }
  const restrictedCount = results.filter((v) => !v.isAllowed).length;
  if (restrictedCount === 0) {
    return;
  }
  logHeader(targetPath, restrictedCount);
  logRestrictedImports(results);
}

// src/log-reports/log-reports.ts
function logReports(root, reports, relativeTsFiles, needsReportUnscoped, scoped, end) {
  reports.forEach(({ tsPath, result }) => {
    logReport(`./${relative3(root, tsPath)}`, result);
  });
  const unscopedFiles = relativeTsFiles.filter(
    (v) => !scoped.has(resolve2(root, v))
  );
  if (needsReportUnscoped) {
    console.log(
      [underline2("Unscoped Files"), gray3(`(${unscopedFiles.length})`)].join(
        " "
      )
    );
    console.log("");
    unscopedFiles.forEach((v) => console.log(v));
    console.log("");
  }
  const restrictedImports = reports.flatMap((v) => v.result).filter((v) => !v.isAllowed).length;
  const output = table2(
    [
      [
        "Files Checked",
        [
          scoped.size,
          scoped.size === 1 ? "file" : "files",
          gray3(
            `(${relativeTsFiles.length} found, ${unscopedFiles.length} unscoped)`
          )
        ].join(" ")
      ],
      [
        "Restricted Imports",
        [restrictedImports, restrictedImports === 1 ? "line" : "lines"].join(
          " "
        )
      ],
      ["Duration", `${end()} ms`]
    ].map(([header, value]) => [
      gray3(header),
      restrictedImports === 0 ? green(value) : yellow(value)
    ]),
    {
      border: getBorderCharacters2("void"),
      columnDefault: {
        paddingLeft: 0,
        paddingRight: 2
      },
      drawHorizontalLine: () => false,
      columns: [{ alignment: "right" }, { alignment: "left" }]
    }
  );
  console.log(output);
}

// src/make-ast.ts
import { readFileSync as readFileSync2 } from "node:fs";
import { basename } from "node:path";
import { parseSync } from "oxc-parser";
import { parse as parse2 } from "valibot";

// src/get-line-start-positions/get-line-start-positions.ts
import { detectNewlineGraceful } from "detect-newline";
function getLineStartPositions(code) {
  const newline = detectNewlineGraceful(code);
  const positions = [];
  positions.push(1);
  for (let i = 0; i < code.length; i++) {
    if (newline === "\r\n" && code[i] === "\r" && code[i + 1] === "\n") {
      positions.push(i + 3);
      i++;
      continue;
    }
    if (newline === "\n" && code[i] === "\n") {
      positions.push(i + 2);
      continue;
    }
  }
  return positions;
}

// src/make-ast.ts
function makeAst(path, errorsRef) {
  const code = readFileSync2(path, "utf-8");
  const result = parseSync(code, {
    sourceType: "module",
    sourceFilename: basename(path)
  });
  if (0 < result.errors.length) {
    errorsRef.push({ path, errors: result.errors });
    return null;
  }
  const ast = JSON.parse(result.program);
  const positions = getLineStartPositions(code);
  return { ast: parse2(ast$, ast), positions };
}

// src/main.ts
async function main() {
  const args = process.argv.slice(2);
  const cwd = process.cwd();
  const absolutePath = (() => {
    const configPath = args[0] ?? "";
    if (configPath === "") {
      throw new Error("Configuration file not found");
    }
    return resolve3(cwd, configPath);
  })();
  const needsReportUnscoped = args.includes("--unscoped");
  const end = timeSpan();
  const config = await importConfig(absolutePath);
  const root = dirname2(absolutePath);
  const ig = loadGitignore(root);
  const relativeTsFiles = findTsFiles(root, ig).map(
    (v) => `./${relative4(root, v)}`
  );
  const scoped = /* @__PURE__ */ new Set();
  const reports = [];
  const errorsRef = [];
  config.scopes.forEach((declaration) => {
    const filteredTsFiles = relativeTsFiles.filter((tsFile) => minimatch(tsFile, declaration.scope)).map((v) => resolve3(root, v));
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
        (v) => {
          return {
            path: `./${relative4(root, resolve3(dirname2(tsPath), v.path))}`,
            line: v.line,
            column: v.column
          };
        }
      );
      const result = infoArray.map((info) => {
        const isAllowed = allowed.reduce((acc, allowedPath) => {
          if (acc) {
            return acc;
          }
          return minimatch(info.path, allowedPath);
        }, false);
        return {
          path: info.path,
          isAllowed,
          line: info.line,
          column: info.column
        };
      });
      reports.push({ tsPath, result });
      scoped.add(tsPath);
    });
  });
  logErrors(errorsRef);
  logReports(root, reports, relativeTsFiles, needsReportUnscoped, scoped, end);
  const restrictedImports = reports.flatMap((v) => v.result).filter((v) => !v.isAllowed).length;
  return restrictedImports === 0;
}

// index.ts
main().then((succeeded) => {
  const exitCode = succeeded ? 0 : 1;
  console.log(`Exiting with code ${exitCode}`);
  process.exit(exitCode);
}).catch((e) => {
  console.error(e);
  console.log(`Exiting with code 1`);
  process.exit(1);
});
