import { TextNode } from "./log-node";

export function buildNodeFromRestrictedReportHeader(
  path: string,
  count: number,
): TextNode {
  return {
    type: "text",
    elements: [
      {
        text: path,
        attributes: [
          { type: "color", value: "gray" },
          { type: "modifier", value: "underline" },
        ],
      },
      { text: " " },
      {
        text: `(${count})`,
        attributes: [{ type: "color", value: "gray" }],
      },
    ],
  };
}
