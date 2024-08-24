import { Alignment } from "table";

type TextAttribute =
  | Readonly<{
      type: "modifier";
      value: "underline";
    }>
  | Readonly<{
      type: "color";
      value: "red" | "green" | "yellow" | "gray";
    }>;

export type TextElement = Readonly<{
  text: string;
  attributes?: readonly TextAttribute[];
}>;

export type TextNode = Readonly<{
  type: "text";
  elements: readonly TextElement[];
  children?: readonly LogNode[];
}>;

export type TableNode = Readonly<{
  type: "table";
  rows: readonly (readonly TextNode[])[];
  alignment: readonly Alignment[];
}>;

export type LogNode = TextNode | TableNode;
