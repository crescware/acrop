import { relative } from "node:path";

import { LogNode, TextNode } from "./log-tree";
import { buildNodeFromResults } from "./build-node-from-results";
import { type Report } from "./report";

export function buildReportNodes(
  reports: readonly Report[],
  root: string,
): readonly LogNode[] {
  return reports
    .flatMap(({ tsPath, result }): readonly LogNode[] => {
      const targetPath = `./${relative(root, tsPath)}`;
      const restrictedCount = result.filter((v) => !v.isAllowed).length;

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
            text: `(${restrictedCount})`,
            attributes: [{ type: "color", value: "gray" }],
          },
        ],
      } satisfies TextNode;

      const tableNode = buildNodeFromResults(result);

      return tableNode === null ? [] : [textNode, tableNode];
    })
    .filter((v) => v !== null);
}
