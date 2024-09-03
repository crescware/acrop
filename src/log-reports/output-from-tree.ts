import { LogTree } from "../log-tree";
import { makeTableLines } from "./make-table-lines";
import { makeFromTextNode } from "./make-from-text-node";

export function outputFromTree(tree: LogTree): void {
  tree.nodes
    .map((node) => {
      if (node.type === "text") {
        return makeFromTextNode(node);
      }
      if (node.type === "table") {
        return makeTableLines(node);
      }
      throw new Error("invalid node");
    })
    .forEach((v) => console.log(v));
}
