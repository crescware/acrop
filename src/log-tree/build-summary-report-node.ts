import { TableNode } from "./log-tree";

type TsFiles = readonly Readonly<{
  relative: string;
  absolute: string;
}>[];

export function buildSummaryReportNode(
  tsFiles: TsFiles,
  scoped: Set<string>,
  duration: number,
  restrictedImports: number,
  unscopedFilesCount: number,
): TableNode {
  const headerAttributes = [{ type: "color", value: "gray" }] as const;
  const columnAttributes =
    restrictedImports === 0
      ? ([{ type: "color", value: "green" }] as const)
      : ([{ type: "color", value: "yellow" }] as const);

  return {
    type: "table",
    rows: [
      [
        {
          type: "text",
          elements: [{ text: "Files Checked", attributes: headerAttributes }],
        },
        {
          type: "text",
          elements: [
            {
              text: (() => {
                return [scoped.size, scoped.size === 1 ? "file" : "files"].join(
                  " ",
                );
              })(),
              attributes: columnAttributes,
            },
            { text: " " },
            {
              text: `(${tsFiles.length} found, ${unscopedFilesCount} unscoped)`,
              attributes: [{ type: "color", value: "gray" }],
            },
          ],
        },
      ],
      [
        {
          type: "text",
          elements: [
            { text: "Restricted Imports", attributes: headerAttributes },
          ],
        },
        {
          type: "text",
          elements: [
            {
              text: (() => {
                return [
                  restrictedImports,
                  restrictedImports === 1 ? "line" : "lines",
                ].join(" ");
              })(),
              attributes: columnAttributes,
            },
          ],
        },
      ],
      [
        {
          type: "text",
          elements: [{ text: "Duration", attributes: headerAttributes }],
        },
        {
          type: "text",
          elements: [{ text: `${duration} sec`, attributes: columnAttributes }],
        },
      ],
    ],
    alignment: ["right", "left"],
  } satisfies TableNode;
}
