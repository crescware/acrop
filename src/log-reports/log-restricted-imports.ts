import { gray } from "yoctocolors";
import { getBorderCharacters, table } from "table";

import { type Result } from "./result";

export function logRestrictedImports(results: readonly Result[]): void {
  const matrix = results
    .map((v): [string, string] | null => {
      if (v.isAllowed) {
        return null;
      }
      const lineCol = gray([v.line, v.column].join(":"));
      return [lineCol, v.path];
    })
    .filter((v) => v !== null);

  const output = table(matrix, {
    border: getBorderCharacters("void"),
    columnDefault: { paddingLeft: 2, paddingRight: 0 },
    drawHorizontalLine: () => false,
    columns: [{ alignment: "left" }, { alignment: "left" }],
  });

  console.log(output);
}
