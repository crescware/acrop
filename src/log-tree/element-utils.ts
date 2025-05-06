import type {
	Color,
	Modifier,
	TableNode,
	TextElement,
	TextNode,
} from "./log-tree";

function colorAttr(v: Color) {
	return { type: "color", value: v } as const;
}

function modifierAttr(v: Modifier) {
	return { type: "modifier", value: v } as const;
}

export function elem(text: string): TextElement {
	return { text };
}

export function space(): TextElement {
	return { text: " " };
}

export function gray(value: string | TextElement): TextElement {
	const base = typeof value === "string" ? elem(value) : value;

	return {
		...base,
		attributes: [...(base.attributes ?? []), colorAttr("gray")],
	};
}

export function yellow(value: string | TextElement): TextElement {
	const base = typeof value === "string" ? elem(value) : value;

	return {
		...base,
		attributes: [...(base.attributes ?? []), colorAttr("yellow")],
	};
}

export function green(value: string | TextElement): TextElement {
	const base = typeof value === "string" ? elem(value) : value;

	return {
		...base,
		attributes: [...(base.attributes ?? []), colorAttr("green")],
	};
}

export function red(value: string | TextElement): TextElement {
	const base = typeof value === "string" ? elem(value) : value;

	return {
		...base,
		attributes: [...(base.attributes ?? []), colorAttr("red")],
	};
}

export function underline(value: string | TextElement): TextElement {
	const base = typeof value === "string" ? elem(value) : value;

	return {
		...base,
		attributes: [...(base.attributes ?? []), modifierAttr("underline")],
	};
}

export function blankLine(): TextNode {
	return { type: "text", elements: [space()] };
}

export function textLine(elements: readonly TextElement[]): TextNode {
	return { type: "text", elements };
}

export function headerCell(text: string): TableNode["rows"][number][number] {
	return textLine([gray(text)]);
}

export function plural(n: number, word: string): string {
	return `${n} ${n === 1 ? word : [word, "s"].join("")}`;
}
