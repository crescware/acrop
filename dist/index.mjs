#!/usr/bin/env node
// src/main.ts
import { dirname as dirname3 } from "node:path";

// src/calc-config-absolute-path.ts
import { resolve } from "node:path";
function calcConfigAbsolutePath(logger, configPath) {
  const end_ = logger.start("Resolve config path");
  const cwd = process.cwd();
  const ret = resolve(cwd, configPath);
  end_();
  return ret;
}

// src/check/check.ts
import { minimatch as minimatch2 } from "minimatch";

// src/check/check-scope.ts
import { dirname as dirname2, relative as relative2, resolve as resolve2 } from "node:path";

// src/exists/exists.ts
function exists(v) {
  return typeof v !== "undefined" && v !== null;
}

// src/exists/assert-exists.ts
function assertExists(v, target = "") {
  if (!exists(v)) {
    throw new Error(`${target} should be specified`.trim());
  }
}

// src/check/analyze-import-access/analyze.ts
import { minimatch } from "minimatch";
function analyze(rulesResult, info) {
  let isAllowed = false;
  let matchedRule = null;
  for (const rule of rulesResult.rules) {
    const matched = minimatch(info.path.relative, rule.pattern);
    if (!matched) {
      continue;
    }
    matchedRule = rule;
    isAllowed = rule.type === "allowed";
    break;
  }
  return {
    path: info.path,
    isAllowed,
    line: info.line,
    column: info.column,
    scopeLabel: matchedRule?.scopeLabel ?? rulesResult.scope
  };
}

// src/check/analyze-import-access/analyze-import-access.ts
function analyzeImportAccess(logger, rules, infoArray) {
  const end = logger.start("> > Analyze import access");
  const ret = infoArray.map((v) => analyze(rules, v));
  end();
  return ret;
}

// src/check/calc-rules.ts
import { dirname, relative } from "node:path";
function expandPatterns(patterns) {
  return patterns.flatMap((pattern) => {
    if (pattern.endsWith("/**/*")) {
      return [pattern, pattern.replace(/\/\*\*\/\*$/, "")];
    }
    return [pattern, `${pattern}/**/*`];
  });
}
function createScopeLabel(scopeName, ruleIndex, ruleName) {
  return ruleName ? ruleName : `${scopeName}:rule[${ruleIndex}]`;
}
function getRuleName(rule) {
  if (!("name" in rule) || !exists(rule.name)) {
    return null;
  }
  return rule.name.length === 0 ? null : rule.name;
}
function processSiblingRule(rule, tsPath, root, scopeName, ruleIndex) {
  if (!("sibling" in rule)) {
    return null;
  }
  const basePath = `./${relative(root, dirname(tsPath))}`;
  const patterns = [`${basePath}/**/*`, basePath];
  const ruleType = rule.sibling ? "allowed" : "restricted";
  const ruleName = getRuleName(rule);
  const scopeLabel = createScopeLabel(scopeName, ruleIndex, ruleName);
  return patterns.map((pattern) => {
    return {
      type: ruleType,
      pattern,
      scopeLabel
    };
  });
}
function processAllowedRule(rule, relativePath, scopeName, ruleIndex) {
  if (!("allowed" in rule)) {
    return [];
  }
  const paths = (() => {
    if (typeof rule.allowed === "object" && Array.isArray(rule.allowed)) {
      return rule.allowed;
    }
    if (typeof rule.allowed === "function") {
      return rule.allowed(relativePath);
    }
    throw new Error(
      "Invalid configuration: rule.allowed is not properly defined"
    );
  })();
  const ruleName = getRuleName(rule);
  const scopeLabel = createScopeLabel(scopeName, ruleIndex, ruleName);
  return expandPatterns(paths).map((pattern) => ({
    type: "allowed",
    pattern,
    scopeLabel
  }));
}
function processRestrictedRule(rule, relativePath, scopeName, ruleIndex) {
  if (!("restricted" in rule)) {
    return [];
  }
  const paths = (() => {
    if (typeof rule.restricted === "object" && Array.isArray(rule.restricted)) {
      return rule.restricted;
    }
    if (typeof rule.restricted === "function") {
      return rule.restricted(relativePath);
    }
    throw new Error(
      "Invalid configuration: rule.restricted is not properly defined"
    );
  })();
  const ruleName = getRuleName(rule);
  const scopeLabel = createScopeLabel(scopeName, ruleIndex, ruleName);
  return expandPatterns(paths).map((pattern) => ({
    type: "restricted",
    pattern,
    scopeLabel
  }));
}
function calcRules(root, tsPath, declaration) {
  const relativePath = `./${relative(root, tsPath)}`;
  const orderedRules = [];
  for (let i = 0; i < declaration.rules.length; i++) {
    const rule = declaration.rules[i];
    assertExists(rule);
    const siblingRules = processSiblingRule(
      rule,
      tsPath,
      root,
      declaration.scope,
      i
    );
    if (exists(siblingRules)) {
      orderedRules.push(...siblingRules);
      continue;
    }
    const allowedRules = processAllowedRule(
      rule,
      relativePath,
      declaration.scope,
      i
    );
    orderedRules.push(...allowedRules);
    const restrictedRules = processRestrictedRule(
      rule,
      relativePath,
      declaration.scope,
      i
    );
    orderedRules.push(...restrictedRules);
  }
  return { rules: orderedRules, scope: declaration.scope };
}

// src/calc-line-number/calc-line-number.ts
function calcLineNumber(positions, start) {
  const i = positions.findLastIndex((pos) => pos <= start);
  const column = start - (positions[i] ?? Number.NaN) + 1;
  if (Number.isNaN(column)) {
    throw new Error("invalid");
  }
  return { line: i + 1, column };
}

// src/check/ast.ts
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
var literal$ = object({
  ...positionEntries,
  type: literal("Literal"),
  value: string()
});
var importDeclaration$ = object({
  ...positionEntries,
  type: literal("ImportDeclaration"),
  source: literal$
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

// src/check/find-import-paths.ts
function findImportPaths(ast, positions_) {
  const importInfos = [];
  function traverse(node, positions) {
    if (isImportDeclaration(node)) {
      const { line, column } = calcLineNumber(positions, node.source.start + 1);
      importInfos.push({
        path: { relative: node.source.value },
        line,
        column
      });
      return;
    }
    if ("body" in node && Array.isArray(node.body)) {
      for (const v of node.body) {
        traverse(v, positions_);
      }
      return;
    }
  }
  for (const v of ast.body) {
    traverse(v, positions_);
  }
  return importInfos;
}

// src/check/make-ast.ts
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { parseSync } from "oxc-parser";
import { parse } from "valibot";

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
    }
  }
  return positions;
}

// src/check/make-ast.ts
function makeAst(path, errorsRef) {
  const code = readFileSync(path, "utf-8");
  const result = parseSync(basename(path), code, {
    sourceType: "module"
  });
  if (0 < result.errors.length) {
    errorsRef.push({ path, errors: result.errors });
    return null;
  }
  const positions = getLineStartPositions(code);
  return { ast: parse(ast$, result.program), positions };
}

// src/check/check-scope.ts
function checkScope(logger, declaration, filtered, root, scoped, errorsRef, reports) {
  for (const path of filtered) {
    const end3 = logger.start(`> > "${path.relative}" Make ast`);
    const makeAstResult = makeAst(path.absolute, errorsRef);
    if (!exists(makeAstResult)) {
      end3();
      continue;
    }
    end3();
    const { ast, positions } = makeAstResult;
    const rules = calcRules(root, path.absolute, declaration);
    const end4 = logger.start(`> > "${path.relative}" Find import paths`);
    const infoArray = findImportPaths(ast, positions).map(
      (v) => {
        const relativePath = `./${relative2(
          root,
          resolve2(dirname2(path.absolute), v.path.relative)
        )}`;
        return {
          path: { relative: relativePath },
          line: v.line,
          column: v.column
        };
      }
    );
    end4();
    const analyzed = analyzeImportAccess(logger, rules, infoArray);
    reports.push({ path, result: analyzed });
    scoped.add(path.absolute);
  }
}

// src/check/check.ts
function check(logger, scopes, tsFiles, root) {
  const end1 = logger.startWithHeader("Check files");
  const scoped = /* @__PURE__ */ new Set();
  const errorsRef = [];
  const reports = [];
  for (const declaration of scopes) {
    const end2 = logger.start(`> "${declaration.scope}" Matched file in scope`);
    const filtered = tsFiles.filter((tsFile) => {
      const end3 = logger.start(`> > "${tsFile.relative}" Match file`);
      if (scoped.has(tsFile.absolute)) {
        end3();
        return;
      }
      const ret2 = minimatch2(tsFile.relative, declaration.scope);
      end3();
      return ret2;
    });
    end2();
    checkScope(logger, declaration, filtered, root, scoped, errorsRef, reports);
  }
  const ret = { scoped, errorsRef, reports };
  end1();
  return ret;
}

// src/extract-cli-config.ts
function extractCliConfig() {
  const args = process.argv.slice(2);
  const needsReportUnscoped = args.includes("--unscoped");
  const verbose = args.includes("--verbose");
  const configPath = args[0] ?? "";
  if (configPath === "") {
    throw new Error("Configuration file not found");
  }
  return { needsReportUnscoped, verbose, configPath };
}

// src/get-all-ts-files/get-all-ts-files.ts
import { relative as relative4, resolve as resolve3 } from "node:path";

// src/get-all-ts-files/find-ts-files.ts
import { readdirSync, statSync } from "node:fs";
import { join, relative as relative3 } from "node:path";
function findTsFiles(rootDir, ig) {
  const results = [];
  function searchDir(dir) {
    const files = readdirSync(dir);
    for (const file of files) {
      const fullPath = join(dir, file);
      if (ig.ignores(relative3(rootDir, fullPath))) {
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

// src/get-all-ts-files/load-gitignore.ts
import ignore from "ignore";
import { existsSync, readFileSync as readFileSync2 } from "node:fs";
import { join as join2 } from "node:path";
function loadGitignore(dir) {
  const gitignorePath = join2(dir, ".gitignore");
  if (existsSync(gitignorePath)) {
    const content = readFileSync2(gitignorePath, "utf-8");
    return ignore().add(content);
  }
  return ignore();
}

// src/get-all-ts-files/get-all-ts-files.ts
function getAllTsFiles(logger, root) {
  const end = logger.start("Find TypeScript files");
  const tsFiles = (() => {
    const ig = loadGitignore(root);
    return findTsFiles(root, ig);
  })().map((v) => {
    return { relative: `./${relative4(root, v)}`, absolute: resolve3(root, v) };
  });
  end();
  return tsFiles;
}

// src/import-config/import-config.ts
import { existsSync as existsSync2, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve as resolve4 } from "node:path";
import { transformFileSync } from "@babel/core";
import { flatten, safeParse as safeParse2 } from "valibot";

// src/import-config/config.ts
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
var rule$ = union2([
  strictObject({
    allowed: union2([pipe2(array2(glob$), minLength(0)), function_()]),
    name: optional(string2())
  }),
  strictObject({
    restricted: union2([pipe2(array2(glob$), minLength(0)), function_()]),
    name: optional(string2())
  }),
  strictObject({
    sibling: boolean(),
    name: optional(string2())
  })
]);
var scope$ = strictObject({
  scope: glob$,
  rules: array2(rule$),
  only: optional(boolean())
});
var config$ = strictObject({
  default: strictObject({
    root: path$,
    scopes: pipe2(array2(scope$), minLength(0))
  })
});

// src/import-config/import-config.ts
var ext = ".mjs";
async function importConfig(logger, path) {
  const end1 = logger.startWithHeader("Import config");
  if (!existsSync2(path)) {
    throw new Error(`Configuration file not found at: ${path}`);
  }
  const end2 = logger.start("> Transform config file");
  const result = transformFileSync(path, {
    presets: ["@babel/preset-typescript"],
    filename: path,
    sourceMaps: false
  });
  const code = result?.code ?? "";
  end2();
  const end3 = logger.start("> Write js config file");
  const tempConfigPath = resolve4(
    tmpdir(),
    `acrop-${crypto.randomUUID()}${ext}`
  );
  let mod;
  try {
    writeFileSync(tempConfigPath, code);
    mod = await import(tempConfigPath);
  } finally {
    unlinkSync(tempConfigPath);
  }
  end3();
  const parseResult = safeParse2(config$, mod);
  if (!parseResult.success) {
    console.info(flatten(parseResult.issues));
    throw new Error();
  }
  const ret = parseResult.output.default;
  end1();
  return ret;
}

// src/log-reports/make-from-text-element.ts
import { gray, green, red, underline, yellow } from "yoctocolors";
function makeFromTextElement(el) {
  return (el.attributes ?? []).reduce((acc, attr) => {
    if (attr.type === "color") {
      switch (attr.value) {
        case "red":
          return red(acc);
        case "green":
          return green(acc);
        case "yellow":
          return yellow(acc);
        case "gray":
          return gray(acc);
        default:
          return acc;
      }
    }
    if (attr.type === "modifier") {
      switch (attr.value) {
        case "underline":
          return underline(acc);
        default:
          return acc;
      }
    }
    return acc;
  }, el.text);
}

// src/log-reports/make-from-text-node.ts
function makeFromTextNode(node) {
  return node.elements.map((v) => makeFromTextElement(v)).join("");
}

// src/log-reports/make-table-lines.ts
import { getBorderCharacters, table } from "table";
function makeTableLines(node) {
  const matrix = node.rows.map((cols) => {
    return cols.map((v) => makeFromTextNode(v));
  });
  return table(matrix, {
    border: getBorderCharacters("void"),
    columnDefault: { paddingLeft: 0, paddingRight: 1 },
    drawHorizontalLine: () => false,
    columns: node.alignment.map((v) => ({ alignment: v }))
  });
}

// src/log-reports/output-from-tree.ts
function outputFromTree(tree) {
  const mapped = tree.nodes.map((node) => {
    if (node.type === "text") {
      return makeFromTextNode(node);
    }
    if (node.type === "table") {
      return makeTableLines(node);
    }
    throw new Error("invalid node");
  });
  for (const v of mapped) {
    console.info(v);
  }
}

// src/log-tree/build-nodes-from-errors.ts
function buildNodesFromErrors(reports) {
  return reports.map((report) => {
    return {
      type: "text",
      elements: [
        {
          text: report.path,
          attributes: [{ type: "color", value: "red" }]
        }
      ],
      children: report.errors.map((line) => {
        return {
          type: "text",
          elements: [{ text: line }]
        };
      })
    };
  });
}

// src/log-tree/build-node-from-results.ts
function buildNodeFromResults(analyzedResults) {
  if (analyzedResults.length === 0) {
    return null;
  }
  return {
    type: "table",
    rows: analyzedResults.map((v) => {
      return [
        {
          type: "text",
          elements: [
            {
              text: [v.line, v.column].join(":"),
              attributes: [{ type: "color", value: "gray" }]
            }
          ]
        },
        { type: "text", elements: [{ text: v.path.relative }] },
        {
          type: "text",
          elements: [
            {
              text: v.scopeLabel,
              attributes: [{ type: "color", value: "gray" }]
            }
          ]
        }
      ];
    }),
    alignment: ["left", "left", "left"]
  };
}

// src/log-tree/build-report-nodes.ts
function buildReportNodes(reports) {
  return reports.flatMap(({ path, result }) => {
    const restricted = result.filter((v) => !v.isAllowed);
    const textNode = {
      type: "text",
      elements: [
        {
          text: path.relative,
          attributes: [
            { type: "modifier", value: "underline" },
            { type: "color", value: "gray" }
          ]
        },
        {
          text: " "
        },
        {
          text: `(${restricted.length})`,
          attributes: [{ type: "color", value: "gray" }]
        }
      ]
    };
    const tableNode = buildNodeFromResults(restricted);
    return tableNode === null ? [] : [textNode, tableNode];
  });
}

// src/log-tree/build-summary-report-node.ts
function buildSummaryReportNode(tsFiles, scoped, duration, restrictedImports, unscopedFilesCount) {
  const headerAttributes = [{ type: "color", value: "gray" }];
  const columnAttributes = restrictedImports === 0 ? [{ type: "color", value: "green" }] : [{ type: "color", value: "yellow" }];
  return {
    type: "table",
    rows: [
      [
        {
          type: "text",
          elements: [{ text: "Files Checked", attributes: headerAttributes }]
        },
        {
          type: "text",
          elements: [
            {
              text: (() => {
                return [scoped.size, scoped.size === 1 ? "file" : "files"].join(
                  " "
                );
              })(),
              attributes: columnAttributes
            },
            { text: " " },
            {
              text: `(${tsFiles.length} found, ${unscopedFilesCount} unscoped)`,
              attributes: [{ type: "color", value: "gray" }]
            }
          ]
        }
      ],
      [
        {
          type: "text",
          elements: [
            { text: "Restricted Imports", attributes: headerAttributes }
          ]
        },
        {
          type: "text",
          elements: [
            {
              text: (() => {
                return [
                  restrictedImports,
                  restrictedImports === 1 ? "line" : "lines"
                ].join(" ");
              })(),
              attributes: columnAttributes
            }
          ]
        }
      ],
      [
        {
          type: "text",
          elements: [{ text: "Duration", attributes: headerAttributes }]
        },
        {
          type: "text",
          elements: [{ text: `${duration} sec`, attributes: columnAttributes }]
        }
      ]
    ],
    alignment: ["right", "left"]
  };
}

// src/log-tree/build-unscoped-report-node.ts
function buildUnscopedReportNode(needsReportUnscoped, unscopedFilesCount, unscopedFiles) {
  return needsReportUnscoped ? [
    {
      type: "text",
      elements: [
        {
          text: "Unscoped Files",
          attributes: [{ type: "modifier", value: "underline" }]
        },
        { text: " " },
        {
          text: `(${unscopedFilesCount})`,
          attributes: [{ type: "color", value: "gray" }]
        }
      ]
    },
    { type: "text", elements: [{ text: " " }] },
    ...unscopedFiles.map((v) => {
      return {
        type: "text",
        elements: [{ text: v.relative }]
      };
    }),
    { type: "text", elements: [{ text: " " }] }
  ] : [];
}

// src/log-tree/build-nodes.ts
function buildNodes(errorsRef, reports, tsFiles, scoped, needsReportUnscoped, duration, restrictedImports) {
  const errorsNodes = buildNodesFromErrors(errorsRef);
  const reportNodes = buildReportNodes(reports);
  const unscopedFiles = tsFiles.filter((v) => !scoped.has(v.absolute));
  const unscopedFilesCount = unscopedFiles.length;
  const unscopedReportNodes = buildUnscopedReportNode(
    needsReportUnscoped,
    unscopedFilesCount,
    unscopedFiles
  );
  const summaryReportNode = buildSummaryReportNode(
    tsFiles,
    scoped,
    duration,
    restrictedImports,
    unscopedFilesCount
  );
  return [
    ...errorsNodes,
    ...reportNodes,
    ...unscopedReportNodes,
    summaryReportNode
  ];
}

// src/log-tree/build-tree.ts
function buildTree(errorsRef, reports, tsFiles, scoped, needsReportUnscoped, duration, restrictedImports) {
  return {
    nodes: buildNodes(
      errorsRef,
      reports,
      tsFiles,
      scoped,
      needsReportUnscoped,
      duration,
      restrictedImports
    )
  };
}

// src/owned-time-span.ts
import timeSpan from "time-span";
function ownedTimeSpan() {
  const v = timeSpan();
  return v.seconds.bind(v);
}

// src/verbose-logger.ts
import timeSpan2 from "time-span";
var VerboseLogger = class {
  #verbose = false;
  constructor(verbose) {
    this.#verbose = verbose;
  }
  start(v) {
    return this.#startImpl(v, false);
  }
  startWithHeader(v) {
    return this.#startImpl(v, true);
  }
  #startImpl(v, showStartLog) {
    if (!this.#verbose) {
      return () => {
      };
    }
    if (showStartLog) {
      console.info(v);
    }
    const end = timeSpan2();
    return () => {
      console.info([`${v}:`, end(), "ms"].join(" "));
    };
  }
};

// src/main.ts
async function main() {
  const end = ownedTimeSpan();
  const {
    needsReportUnscoped,
    verbose,
    configPath: unresolvedConfigPath
  } = extractCliConfig();
  const logger = new VerboseLogger(verbose);
  const configPath = calcConfigAbsolutePath(logger, unresolvedConfigPath);
  const root = dirname3(configPath);
  const config = await importConfig(logger, configPath);
  const tsFiles = getAllTsFiles(logger, root);
  const onlyScopes = config.scopes.filter((scope) => scope.only);
  const hasOnlyScopes = 0 < onlyScopes.length;
  const scopeDeclarations = hasOnlyScopes ? onlyScopes : config.scopes;
  if (hasOnlyScopes) {
    console.info(
      `Found ${onlyScopes.length} scope(s) with "only: true", processing only these scopes`
    );
    console.info("");
  }
  const { scoped, errorsRef, reports } = check(
    logger,
    scopeDeclarations,
    tsFiles,
    root
  );
  const duration = end();
  const restrictedImports = reports.flatMap((v) => v.result).filter((v) => !v.isAllowed).length;
  const tree = buildTree(
    errorsRef,
    reports,
    tsFiles,
    scoped,
    needsReportUnscoped,
    duration,
    restrictedImports
  );
  outputFromTree(tree);
  if (hasOnlyScopes) {
    console.info(`Failed due to "only: true" flag`);
    return false;
  }
  return restrictedImports === 0;
}

// index.ts
main().then((succeeded) => {
  const exitCode = succeeded ? 0 : 1;
  console.info(`Exiting with code ${exitCode}`);
  process.exit(exitCode);
}).catch((e) => {
  console.error(e);
  console.info("Exiting with code 1");
  process.exit(1);
});
