import { TextNode } from "./log-tree";

type UnscopedFiles = readonly Readonly<{
  relative: string;
  absolute: string;
}>[];

export function buildUnscopedReportNode(
  needsReportUnscoped: boolean,
  unscopedFilesCount: number,
  unscopedFiles: UnscopedFiles,
): readonly TextNode[] {
  return needsReportUnscoped
    ? ([
        {
          type: "text",
          elements: [
            {
              text: "Unscoped Files",
              attributes: [{ type: "modifier", value: "underline" }],
            },
            { text: " " },
            {
              text: `(${unscopedFilesCount})`,
              attributes: [{ type: "color", value: "gray" }],
            },
          ],
        },
        { type: "text", elements: [{ text: " " }] },
        ...unscopedFiles.map((v): TextNode => {
          return {
            type: "text",
            elements: [{ text: v.relative }],
          };
        }),
        { type: "text", elements: [{ text: " " }] },
      ] satisfies readonly TextNode[])
    : ([] satisfies readonly TextNode[]);
}
