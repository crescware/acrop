import type { LogTree } from "../log-tree";
import { makeFromTextNode } from "./make-from-text-node";
import { makeTableLines } from "./make-table-lines";

export function outputFromTree(tree: LogTree): void {
	const mapped = tree.nodes.map((node) => {
		if (node.type === "text") {
			return makeFromTextNode(node);
		}
		if (node.type === "table") {
			return makeTableLines(node);
		}
		throw new Error("invalid node");
	});

	for (const v of mapped) {
		console.info(v);
	}
}
