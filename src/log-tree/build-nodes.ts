import { resolve } from "node:path";

import { buildNodesFromErrors } from "./build-nodes-from-errors";
import { buildReportNodes } from "./build-report-nodes";
import { buildSummaryReportNode } from "./build-summary-report-node";
import { buildUnscopedReportNode } from "./build-unscoped-report-node";
import { LogNode } from "./log-node";

export function buildNodes(
  errorsRef: Parameters<typeof buildNodesFromErrors>[0],
  reports: Parameters<typeof buildReportNodes>[0],
  root: Parameters<typeof buildReportNodes>[1],
  relativeTsFiles: Parameters<typeof buildSummaryReportNode>[0],
  scoped: Parameters<typeof buildSummaryReportNode>[1],
  needsReportUnscoped: Parameters<typeof buildUnscopedReportNode>[0],
  duration: Parameters<typeof buildSummaryReportNode>[2],
  restrictedImports: Parameters<typeof buildSummaryReportNode>[3],
): readonly LogNode[] {
  const errorsNodes = buildNodesFromErrors(errorsRef);
  const reportNodes = buildReportNodes(reports, root);

  const unscopedFiles = relativeTsFiles.filter(
    (v) => !scoped.has(resolve(root, v)),
  );

  const unscopedFilesCount = unscopedFiles.length;

  const unscopedReportNodes = buildUnscopedReportNode(
    needsReportUnscoped,
    unscopedFilesCount,
    unscopedFiles,
  );

  const summaryReportNode = buildSummaryReportNode(
    relativeTsFiles,
    scoped,
    duration,
    restrictedImports,
    unscopedFilesCount,
  );

  return [
    ...errorsNodes,
    ...reportNodes,
    ...unscopedReportNodes,
    summaryReportNode,
  ];
}
