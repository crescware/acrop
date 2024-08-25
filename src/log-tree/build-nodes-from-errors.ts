import { ErrorReport } from "../error-report";
import { TextNode } from "./log-node";

export function buildNodesFromErrors(
  reports: readonly ErrorReport[],
): readonly TextNode[] {
  return reports.map((report): TextNode => {
    return {
      type: "text",
      elements: [
        {
          text: report.path,
          attributes: [{ type: "color", value: "red" }],
        },
      ],
      children: report.errors.map((line): TextNode => {
        return {
          type: "text",
          elements: [{ text: line }],
        };
      }),
    };
  });
}
