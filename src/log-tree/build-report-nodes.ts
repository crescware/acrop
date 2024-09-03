import { LogNode, TextNode } from "./log-tree";
import { buildNodeFromResults } from "./build-node-from-results";
import { type Report } from "./report";

export function buildReportNodes(
  reports: readonly Report[],
): readonly LogNode[] {
  return reports.flatMap(({ tsPath, result }): readonly LogNode[] => {
    const targetPath = `./${tsPath.relative}`;
    const restricted = result.filter((v) => !v.isAllowed);

    const textNode = {
      type: "text",
      elements: [
        {
          text: targetPath,
          attributes: [
            { type: "modifier", value: "underline" },
            { type: "color", value: "gray" },
          ],
        },
        {
          text: " ",
        },
        {
          text: `(${restricted.length})`,
          attributes: [{ type: "color", value: "gray" }],
        },
      ],
    } satisfies TextNode;

    const tableNode = buildNodeFromResults(restricted);

    return tableNode === null ? [] : [textNode, tableNode];
  });
}
