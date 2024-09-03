import { getBorderCharacters, table } from "table";

import { TableNode } from "../log-tree/log-tree";
import { makeFromTextNode } from "./make-from-text-node";

export function makeTableLines(node: TableNode): string {
  const matrix = node.rows.map((cols) => {
    return cols.map((v) => makeFromTextNode(v));
  });

  return table(matrix, {
    border: getBorderCharacters("void"),
    columnDefault: { paddingLeft: 0, paddingRight: 1 },
    drawHorizontalLine: () => false,
    columns: node.alignment.map((v) => ({ alignment: v })),
  });
}
