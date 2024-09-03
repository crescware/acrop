import { type LogTree } from "./log-tree";
import { buildNodes } from "./build-nodes";

export function buildTree(
  errorsRef: Parameters<typeof buildNodes>[0],
  reports: Parameters<typeof buildNodes>[1],
  tsFiles: Parameters<typeof buildNodes>[2],
  scoped: Parameters<typeof buildNodes>[3],
  needsReportUnscoped: Parameters<typeof buildNodes>[4],
  duration: Parameters<typeof buildNodes>[5],
  restrictedImports: Parameters<typeof buildNodes>[6],
): LogTree {
  return {
    nodes: buildNodes(
      errorsRef,
      reports,
      tsFiles,
      scoped,
      needsReportUnscoped,
      duration,
      restrictedImports,
    ),
  };
}
