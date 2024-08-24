import { type TableNode } from "../log-tree/log-node";
import { makeTableLines } from "./make-table-lines";

export function logRestrictedImports(node: TableNode): void {
  console.log(makeTableLines(node));
}
