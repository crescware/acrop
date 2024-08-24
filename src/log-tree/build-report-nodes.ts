import { relative } from "node:path";

import { type Report } from "../log-reports";
import { LogNode, TextNode } from "./log-node";
import { buildNodeFromResults } from "./build-node-from-results";

export function buildReportNodes(reports: readonly Report[], root: string) {
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

      if (tableNode === null) {
        return [];
      }
      return [textNode, tableNode];
    })
    .filter((v) => v !== null);
}
