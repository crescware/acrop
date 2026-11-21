import type { LogTree } from "../log-tree";
import { makeFromTextNode } from "./make-from-text-node";
import { makeTableLines } from "./make-table-lines";

export function outputFromTree(tree: LogTree): void {
	for (const node of tree.nodes) {
		if (node.type === "text") {
			console.info(makeFromTextNode(node));
			if (node.children) {
				outputFromTree({ nodes: node.children });
			}
		} else {
			console.info(makeTableLines(node));
		}
	}
}
