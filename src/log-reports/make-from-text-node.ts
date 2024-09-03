import { TextNode } from "../log-tree/log-tree";
import { makeFromTextElement } from "./make-from-text-element";

export function makeFromTextNode(node: TextNode): string {
  return node.elements.map((v) => makeFromTextElement(v)).join("");
}
