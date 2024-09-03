import { type Result } from "./result";
import { TableNode } from "./log-tree";

export function buildNodeFromResults(
  results: readonly Result[],
): TableNode | null {
  const filtered = results.filter((v) => !v.isAllowed);

  if (filtered.length === 0) {
    return null;
  }

  return {
    type: "table",
    rows: results
      .filter((v) => !v.isAllowed)
      .map((v) => {
        return [
          {
            type: "text",
            elements: [
              {
                text: [v.line, v.column].join(":"),
                attributes: [{ type: "color", value: "gray" }],
              },
            ],
          },
          { type: "text", elements: [{ text: v.path }] },
        ];
      }),
    alignment: ["left", "left"],
  } satisfies TableNode;
}
