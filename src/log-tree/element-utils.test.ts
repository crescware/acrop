import { describe, expect, test } from "vitest";

import { elem, gray, underline } from "./element-utils";

describe("element-utils", () => {
	test("elem returns a TextElement that only contains the given text", () => {
		const expected = { text: "foo" } satisfies ReturnType<typeof elem>;
		const actual = elem("foo");
		expect(actual).toEqual(expected);
	});

	test("gray(string) wraps plain text with a gray color attribute", () => {
		const expected = {
			text: "foo",
			attributes: [{ type: "color", value: "gray" }],
		} satisfies ReturnType<typeof gray>;

		const actual = gray("foo");
		expect(actual).toEqual(expected);
	});

	test("gray(TextElement) adds a gray color attribute to an existing element", () => {
		const expected = {
			text: "foo",
			attributes: [
				{ type: "modifier", value: "underline" },
				{ type: "color", value: "gray" },
			],
		} satisfies ReturnType<typeof gray>;

		const base = {
			text: "foo",
			attributes: [{ type: "modifier", value: "underline" }],
		} as const;

		const actual = gray(base);
		expect(actual).toEqual(expected);
	});

	test("underline(string) wraps plain text with an underline modifier", () => {
		const expected = {
			text: "foo",
			attributes: [{ type: "modifier", value: "underline" }],
		} satisfies ReturnType<typeof underline>;

		const actual = underline("foo");
		expect(actual).toEqual(expected);
	});

	test("underline(gray(string)) appends an underline modifier after the gray color attribute", () => {
		const expected = {
			text: "foo",
			attributes: [
				{ type: "color", value: "gray" },
				{ type: "modifier", value: "underline" },
			],
		} satisfies ReturnType<typeof underline>;

		const actual = underline(gray("foo"));
		expect(actual).toEqual(expected);
	});

	test("gray(underline(string)) appends a gray color attribute after the underline modifier", () => {
		const expected = {
			text: "foo",
			attributes: [
				{ type: "modifier", value: "underline" },
				{ type: "color", value: "gray" },
			],
		} satisfies ReturnType<typeof gray>;

		const actual = gray(underline("foo"));
		expect(actual).toEqual(expected);
	});
});
