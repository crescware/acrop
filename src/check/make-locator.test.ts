import { describe, expect, test } from "vitest";

import { makeLocator } from "./make-locator";

describe("makeLocator()", () => {
	test.each([
		{ code: 'import "./a";', offset: 7, expected: { line: 1, column: 8 } },
		{
			code: 'const a = 1;\nimport "./b";',
			offset: 20,
			expected: { line: 2, column: 8 },
		},
		{
			code: 'const a = 1;\r\nimport "./b";',
			offset: 21,
			expected: { line: 2, column: 8 },
		},
	])("locates offset $offset of $code", ({ code, offset, expected }) => {
		expect(makeLocator(code)(offset)).toEqual(expected);
	});

	test("locates every offset it is asked for in the same file", () => {
		const locate = makeLocator('import "./a";\nimport "./b";');

		expect(locate(21)).toEqual({ line: 2, column: 8 });
		expect(locate(7)).toEqual({ line: 1, column: 8 });
	});
});
