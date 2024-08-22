import timeSpan from "time-span";
import { relative, resolve } from "node:path";
import { gray, green, underline, yellow } from "yoctocolors";
import { getBorderCharacters, table } from "table";

import { logReport } from "./log-report";
import { Report } from "./report";

export function logReports(
  root: string,
  reports: readonly Report[],
  relativeTsFiles: readonly string[],
  needsReportUnscoped: boolean,
  scoped: Set<string>,
  end: ReturnType<typeof timeSpan>,
): void {
  reports.forEach(({ tsPath, result }) => {
    logReport(`./${relative(root, tsPath)}`, result);
  });

  const unscopedFiles = relativeTsFiles.filter(
    (v) => !scoped.has(resolve(root, v)),
  );

  if (needsReportUnscoped) {
    console.log(
      [underline("Unscoped Files"), gray(`(${unscopedFiles.length})`)].join(
        " ",
      ),
    );
    console.log("");
    unscopedFiles.forEach((v) => console.log(v));
    console.log("");
  }

  const restrictedImports = reports
    .flatMap((v) => v.result)
    .filter((v) => !v.isAllowed).length;

  const output = table(
    (
      [
        [
          "Files Checked",
          [
            scoped.size,
            scoped.size === 1 ? "file" : "files",
            gray(
              `(${relativeTsFiles.length} found, ${unscopedFiles.length} unscoped)`,
            ),
          ].join(" "),
        ],
        [
          "Restricted Imports",
          [restrictedImports, restrictedImports === 1 ? "line" : "lines"].join(
            " ",
          ),
        ],
        ["Duration", `${end()} ms`],
      ] as const
    ).map(([header, value]) => [
      gray(header),
      restrictedImports === 0 ? green(value) : yellow(value),
    ]),
    {
      border: getBorderCharacters("void"),
      columnDefault: {
        paddingLeft: 0,
        paddingRight: 2,
      },
      drawHorizontalLine: () => false,
      columns: [{ alignment: "right" }, { alignment: "left" }],
    },
  );

  console.log(output);
}
