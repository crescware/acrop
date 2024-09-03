import { type LogTree } from "./log-tree";
import { buildNodes } from "./build-nodes";

export function buildTree(
  errorsRef: Parameters<typeof buildNodes>[0],
  reports: Parameters<typeof buildNodes>[1],
  root: Parameters<typeof buildNodes>[2],
  relativeTsFiles: Parameters<typeof buildNodes>[3],
  scoped: Parameters<typeof buildNodes>[4],
  needsReportUnscoped: Parameters<typeof buildNodes>[5],
  duration: Parameters<typeof buildNodes>[6],
  restrictedImports: Parameters<typeof buildNodes>[7],
): LogTree {
  return {
    nodes: buildNodes(
      errorsRef,
      reports,
      root,
      relativeTsFiles,
      scoped,
      needsReportUnscoped,
      duration,
      restrictedImports,
    ),
  };
}
