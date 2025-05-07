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
function analyze(rulesResult, info, trackerRef) {
  let isAllowed = false;
  let matchedRule = null;
  for (const rule of rulesResult.rules) {
    const matched = minimatch(info.path.relative, rule.pattern);
    if (!matched) {
      continue;
    }
    matchedRule = rule;
    trackerRef.markAsMatched(matchedRule);
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
function analyzeImportAccess(logger, rules, infoArray, trackerRef) {
  const end = logger.start("> > Analyze import access");
  const ret = infoArray.map(
    (v) => analyze(rules, v, trackerRef)
  );
  end();
  return ret;
}

// src/check/calc-rules.ts
import { dirname, relative } from "node:path";

// src/pattern/wildcard.ts
var wildcard = "/**/*";

// src/pattern/expand-patterns.ts
function expandPatterns(patterns) {
  return patterns.flatMap((pattern) => {
    if (pattern.endsWith(wildcard)) {
      return [pattern, pattern.replace(/\/\*\*\/\*$/, "")];
    }
    return [pattern, [pattern, wildcard].join("")];
  });
}

// src/check/calc-rules.ts
function createScopeLabel(scopeName, ruleIndex, ruleName) {
  return ruleName ? ruleName : `${scopeName}:rule[${ruleIndex}]`;
}
function getRuleName(rule) {
  if (!("name" in rule) || !exists(rule.name)) {
    return null;
  }
  return rule.name.length === 0 ? null : rule.name;
}
function processSiblingRule(rule, tsPath, root, scopeName, ruleIndex, trackerRef) {
  if (!("sibling" in rule)) {
    return null;
  }
  const basePath = `./${relative(root, dirname(tsPath))}`;
  const patterns = [`${basePath}/**/*`, basePath];
  const ruleType = rule.sibling ? "allowed" : "restricted";
  const ruleName = getRuleName(rule);
  const scopeLabel = createScopeLabel(scopeName, ruleIndex, ruleName);
  const rules = [];
  for (const pattern of patterns) {
    const rule2 = {
      type: ruleType,
      pattern,
      scopeLabel,
      ruleIndex
    };
    trackerRef.addPattern({ scopeName, scopeLabel, ruleIndex, pattern });
    rules.push(rule2);
  }
  return rules;
}
function processAllowedRule(rule, relativePath, scopeName, ruleIndex, trackerRef) {
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
  const expandedPatterns = expandPatterns(paths);
  const rules = [];
  for (const pattern of expandedPatterns) {
    const rule2 = {
      type: "allowed",
      pattern,
      scopeLabel,
      ruleIndex
    };
    trackerRef.addPattern({ scopeName, scopeLabel, ruleIndex, pattern });
    rules.push(rule2);
  }
  return rules;
}
function processRestrictedRule(rule, relativePath, scopeName, ruleIndex, trackerRef) {
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
  const expandedPatterns = expandPatterns(paths);
  const rules = [];
  for (const pattern of expandedPatterns) {
    const rule2 = {
      type: "restricted",
      pattern,
      scopeLabel,
      ruleIndex
    };
    trackerRef.addPattern({ scopeName, scopeLabel, ruleIndex, pattern });
    rules.push(rule2);
  }
  return rules;
}
function calcRules(root, tsPath, declaration, trackerRef) {
  const relativePath = `./${relative(root, tsPath)}`;
  const orderedRules = [];
  for (const [index, rule] of declaration.rules.entries()) {
    assertExists(rule);
    const siblingRules = processSiblingRule(
      rule,
      tsPath,
      root,
      declaration.scope,
      index,
      trackerRef
    );
    if (exists(siblingRules)) {
      orderedRules.push(...siblingRules);
      continue;
    }
    const allowedRules = processAllowedRule(
      rule,
      relativePath,
      declaration.scope,
      index,
      trackerRef
    );
    orderedRules.push(...allowedRules);
    const restrictedRules = processRestrictedRule(
      rule,
      relativePath,
      declaration.scope,
      index,
      trackerRef
    );
    orderedRules.push(...restrictedRules);
  }
  return {
    rules: orderedRules,
    scope: declaration.scope
  };
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
function checkScope(logger, declaration, filtered, root, scoped, errorsRef, reports, trackerRef) {
  for (const path of filtered) {
    const end3 = logger.start(`> > "${path.relative}" Make ast`);
    const makeAstResult = makeAst(path.absolute, errorsRef);
    if (!exists(makeAstResult)) {
      end3();
      continue;
    }
    end3();
    const { ast, positions } = makeAstResult;
    const rules = calcRules(root, path.absolute, declaration, trackerRef);
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
    const analyzed = analyzeImportAccess(logger, rules, infoArray, trackerRef);
    reports.push({ path, result: analyzed });
    scoped.add(path.absolute);
  }
}

// src/check/check.ts
function check(logger, scopes, tsFiles, root, trackerRef) {
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
        return false;
      }
      const ret2 = minimatch2(tsFile.relative, declaration.scope);
      end3();
      return ret2;
    });
    end2();
    checkScope(
      logger,
      declaration,
      filtered,
      root,
      scoped,
      errorsRef,
      reports,
      trackerRef
    );
  }
  const ret = { scoped, errorsRef, reports };
  end1();
  return ret;
}

// src/extract-cli-config/extract-cli-config.ts
import arg from "arg";

// src/extract-cli-config/handle-unmatched-patterns.ts
var severity = ["off", "warn", "error"];
var isSeverity = (v) => {
  return severity.includes(v);
};
function handleUnmatchedPatterns(v) {
  if (typeof v === "undefined") {
    throw new Error(
      "Error: Missing value for --unmatched-patterns. Expected 'off', 'warn', or 'error'."
    );
  }
  if (!isSeverity(v)) {
    throw new Error(
      `Error: Invalid value for --unmatched-patterns. Expected ${severity.join(" or ")}. Got: ${v}`
    );
  }
  switch (v) {
    case "off":
      return { needsCheck: false, shouldFail: false };
    case "warn":
      return { needsCheck: true, shouldFail: false };
    case "error":
      return { needsCheck: true, shouldFail: true };
    default:
      throw new Error(
        // biome-ignore lint/suspicious/noExplicitAny:
        `Internal error: Unexpected severity value: ${v}`
      );
  }
}

// src/extract-cli-config/unmatched-patterns-flags.ts
var defaultUnmatchedPatternsFlags = {
  needsCheck: false,
  shouldFail: false
};

// src/extract-cli-config/extract-cli-config.ts
function extractCliConfig() {
  const parsed = arg(
    {
      "--unscoped": Boolean,
      "--verbose": Boolean,
      "--unmatched-patterns": handleUnmatchedPatterns
    },
    {
      argv: process.argv.slice(2),
      permissive: false
    }
  );
  const configPath = parsed._[0];
  if (configPath === "" || typeof configPath === "undefined") {
    throw new Error("Configuration file not found");
  }
  return {
    needsReportUnscoped: Boolean(parsed["--unscoped"]),
    verbose: Boolean(parsed["--verbose"]),
    configPath,
    unmatchedPatterns: parsed["--unmatched-patterns"] ?? defaultUnmatchedPatternsFlags
  };
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

// src/log-tree/element-utils.ts
function colorAttr(v) {
  return { type: "color", value: v };
}
function modifierAttr(v) {
  return { type: "modifier", value: v };
}
function elem(text) {
  return { text };
}
function space() {
  return { text: " " };
}
function gray2(value) {
  const base = typeof value === "string" ? elem(value) : value;
  return {
    ...base,
    attributes: [...base.attributes ?? [], colorAttr("gray")]
  };
}
function yellow2(value) {
  const base = typeof value === "string" ? elem(value) : value;
  return {
    ...base,
    attributes: [...base.attributes ?? [], colorAttr("yellow")]
  };
}
function green2(value) {
  const base = typeof value === "string" ? elem(value) : value;
  return {
    ...base,
    attributes: [...base.attributes ?? [], colorAttr("green")]
  };
}
function red2(value) {
  const base = typeof value === "string" ? elem(value) : value;
  return {
    ...base,
    attributes: [...base.attributes ?? [], colorAttr("red")]
  };
}
function underline2(value) {
  const base = typeof value === "string" ? elem(value) : value;
  return {
    ...base,
    attributes: [...base.attributes ?? [], modifierAttr("underline")]
  };
}
function blankLine() {
  return { type: "text", elements: [space()] };
}
function textLine(elements) {
  return { type: "text", elements };
}
function headerCell(text) {
  return textLine([gray2(text)]);
}
function plural(n, word) {
  return `${n} ${n === 1 ? word : [word, "s"].join("")}`;
}

// src/log-tree/build-nodes-from-errors.ts
function buildNodesFromErrors(reports) {
  return reports.map((report) => {
    return {
      type: "text",
      elements: [red2(report.path)],
      children: report.errors.map((v) => textLine([elem(v)]))
    };
  });
}

// src/log-tree/build-node-from-results.ts
function buildNodeFromResults(analyzedResults) {
  if (analyzedResults.length === 0) {
    return null;
  }
  const rows = analyzedResults.map((v) => {
    return [
      textLine([gray2(`${v.line}:${v.column}`)]),
      textLine([elem(v.path.relative)]),
      textLine([gray2(v.scopeLabel)])
    ];
  });
  return {
    type: "table",
    rows,
    alignment: ["left", "left", "left"]
  };
}

// src/log-tree/build-report-nodes.ts
function buildReportNodes(reports) {
  return reports.flatMap(({ path, result }) => {
    const restricted = result.filter((v) => !v.isAllowed);
    const textNode = textLine([
      gray2(underline2(path.relative)),
      space(),
      gray2(`(${restricted.length})`)
    ]);
    const tableNode = buildNodeFromResults(restricted);
    return tableNode === null ? [] : [textNode, tableNode];
  });
}

// src/log-tree/build-summary-report-node.ts
function buildSummaryReportNode(tsFilesCount, scoped, duration, restrictedImports, unscopedFilesCount) {
  const colorize = restrictedImports === 0 ? green2 : yellow2;
  const filesRow = [
    headerCell("Files Checked"),
    textLine([
      colorize([plural(scoped.size, "file")].join(" ")),
      space(),
      gray2(`(${tsFilesCount} found, ${unscopedFilesCount} unscoped)`)
    ])
  ];
  const restrictedImportsRow = [
    headerCell("Restricted Imports"),
    textLine([colorize(plural(restrictedImports, "line"))])
  ];
  const durationRow = [
    headerCell("Duration"),
    textLine([colorize(`${duration} sec`)])
  ];
  return {
    type: "table",
    rows: [filesRow, restrictedImportsRow, durationRow],
    alignment: ["right", "left"]
  };
}

// src/log-tree/build-unmatched-patterns-report-node.ts
function buildUnmatchedPatternsReportNode(unmatchedPatterns, cliFlags) {
  if (!cliFlags.needsCheck || unmatchedPatterns.length === 0) {
    return [];
  }
  const nodes = [];
  nodes.push(
    textLine([
      elem(
        `Found ${unmatchedPatterns.length} unused pattern(s) defined in rules:`
      )
    ])
  );
  nodes.push(blankLine());
  const groupedPatterns = /* @__PURE__ */ new Map();
  for (const p of unmatchedPatterns) {
    if (!groupedPatterns.has(p.scopeName)) {
      groupedPatterns.set(p.scopeName, []);
    }
    const patterns = groupedPatterns.get(p.scopeName);
    assertExists(patterns);
    patterns.push(p);
  }
  for (const [scopeName, patternsInScope] of groupedPatterns.entries()) {
    nodes.push(
      textLine([
        gray2(underline2(scopeName)),
        space(),
        gray2(`(${patternsInScope.length})`)
      ])
    );
    const tableRows = patternsInScope.map((p) => [
      textLine([gray2(`rules[${p.ruleIndex.toString()}]`)]),
      textLine([elem(p.pattern)])
    ]);
    nodes.push({
      type: "table",
      rows: tableRows,
      alignment: ["left", "left"]
    });
  }
  if (cliFlags.shouldFail) {
    nodes.push(
      textLine([
        elem(
          `Failing build due to unused patterns and "unmatchedPatterns.shouldFail: true" setting.`
        )
      ])
    );
    nodes.push(blankLine());
  }
  return nodes;
}

// src/log-tree/build-unscoped-report-node.ts
function buildUnscopedReportNode(needsReportUnscoped, unscopedFilesCount, unscopedFiles) {
  if (!needsReportUnscoped) {
    return [];
  }
  return [
    textLine([
      underline2("Unscoped Files"),
      space(),
      gray2(`(${unscopedFilesCount})`)
    ]),
    blankLine(),
    ...unscopedFiles.map((v) => textLine([elem(v.relative)])),
    blankLine()
  ];
}

// src/log-tree/build-nodes.ts
function buildNodes(errorsRef, reports, tsFiles, scoped, duration, restrictedImports, unmatchedPatterns, cliConfig) {
  const errorsNodes = buildNodesFromErrors(errorsRef);
  const reportNodes = buildReportNodes(reports);
  const unscopedFiles = tsFiles.filter((v) => !scoped.has(v.absolute));
  const unscopedFilesCount = unscopedFiles.length;
  const unscopedReportNodes = buildUnscopedReportNode(
    cliConfig.needsReportUnscoped,
    unscopedFilesCount,
    unscopedFiles
  );
  const summaryReportNode = buildSummaryReportNode(
    tsFiles.length,
    scoped,
    duration,
    restrictedImports,
    unscopedFilesCount
  );
  const unmatchedPatternsNodes = buildUnmatchedPatternsReportNode(
    unmatchedPatterns,
    cliConfig.unmatchedPatterns
  );
  return [
    ...errorsNodes,
    ...reportNodes,
    ...unscopedReportNodes,
    ...unmatchedPatternsNodes,
    summaryReportNode
  ];
}

// src/log-tree/build-tree.ts
function buildTree(errorsRef, reports, tsFiles, scoped, duration, restrictedImports, unmatchedPatterns, cliConfig) {
  return {
    nodes: buildNodes(
      errorsRef,
      reports,
      tsFiles,
      scoped,
      duration,
      restrictedImports,
      unmatchedPatterns,
      cliConfig
    )
  };
}

// src/owned-time-span.ts
import timeSpan from "time-span";
function ownedTimeSpan() {
  const v = timeSpan();
  return v.seconds.bind(v);
}

// src/pattern/canonicalize.ts
function canonicalize(pattern) {
  return pattern.endsWith(wildcard) ? pattern.replace(/\/\*\*\/\*$/, "") : pattern;
}

// src/unmatched-pattern-tracker.ts
var UnmatchedPatternsTracker = class {
  #allPatterns = /* @__PURE__ */ new Map();
  #matchedPatternKeys = /* @__PURE__ */ new Set();
  addPattern(info) {
    const key = this.#makeKey(info.scopeLabel, info.ruleIndex, info.pattern);
    if (!this.#allPatterns.has(key)) {
      this.#allPatterns.set(key, info);
    }
  }
  markAsMatched(rule) {
    const key = this.#makeKey(rule.scopeLabel, rule.ruleIndex, rule.pattern);
    if (this.#allPatterns.has(key)) {
      this.#matchedPatternKeys.add(key);
    }
  }
  getUnmatchedPatterns() {
    const unmatched = [];
    for (const [key, info] of this.#allPatterns.entries()) {
      if (!this.#matchedPatternKeys.has(key)) {
        unmatched.push(info);
      }
    }
    return unmatched;
  }
  #makeKey(scopeLabel, ruleIndex, pattern) {
    const canonical = canonicalize(pattern);
    return JSON.stringify({ scopeLabel, ruleIndex, pattern: canonical });
  }
};

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
  const cliConfig = extractCliConfig();
  const logger = new VerboseLogger(cliConfig.verbose);
  const configPath = calcConfigAbsolutePath(logger, cliConfig.configPath);
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
  const tracker = new UnmatchedPatternsTracker();
  const { scoped, errorsRef, reports } = check(
    logger,
    scopeDeclarations,
    tsFiles,
    root,
    tracker
  );
  const unmatchedPatterns = tracker.getUnmatchedPatterns();
  const duration = end();
  const restrictedImports = reports.flatMap((v) => v.result).filter((v) => !v.isAllowed).length;
  const tree = buildTree(
    errorsRef,
    reports,
    tsFiles,
    scoped,
    duration,
    restrictedImports,
    unmatchedPatterns,
    cliConfig
  );
  outputFromTree(tree);
  if (hasOnlyScopes) {
    console.info(`Failed due to "only: true" flag`);
    return false;
  }
  if (cliConfig.unmatchedPatterns.needsCheck && cliConfig.unmatchedPatterns.shouldFail && 0 < unmatchedPatterns.length) {
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
