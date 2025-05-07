import type { Alignment } from "table";

export type Modifier = "underline";
export type Color = "red" | "green" | "yellow" | "gray";

type TextAttribute =
	| Readonly<{
			type: "modifier";
			value: Modifier;
	  }>
	| Readonly<{
			type: "color";
			value: Color;
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

export type LogTree = Readonly<{
	nodes: readonly LogNode[];
}>;
