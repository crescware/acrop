import { logRestrictedImports } from "./log-restricted-imports";
import { logHeader } from "./log-header";
import { Result } from "./result";

export function logReport(
  targetPath: string,
  results: readonly Result[],
): void {
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
