import { describe, expect, test } from "vitest";

import { compiledPatternLimit, matchesPattern } from "./matches-pattern";

describe("matchesPattern()", () => {
	test.each([
		{ pattern: "./**/*", path: "./lib/a.ts", expected: true },
		{ pattern: "./**/*", path: "./.cache/a.ts", expected: false },
		{ pattern: "./**/*", path: ".", expected: false },
		{ pattern: "./lib", path: "./lib", expected: true },
		{ pattern: "./lib", path: "./lib/a.ts", expected: false },
		{ pattern: "./{ui,shared}/*", path: "./shared/a.ts", expected: true },
		{ pattern: "./{ui,shared}/*", path: "./other/a.ts", expected: false },
		{ pattern: "!./src/*", path: "./src/a.ts", expected: false },
		{ pattern: "!./src/*", path: "./other/a.ts", expected: true },
		{ pattern: "#lib", path: "#lib", expected: false },
		{ pattern: "", path: "", expected: true },
		{ pattern: "", path: "./a.ts", expected: false },
	] as const)("$pattern against $path", ({ pattern, path, expected }) => {
		expect(matchesPattern(path, pattern)).toBe(expected);
	});

	test("stays correct after compiling more patterns than it keeps", () => {
		for (let i = 0; i <= compiledPatternLimit; i++) {
			expect(matchesPattern(`./d${i}/a.ts`, `./d${i}/*`)).toBe(true);
		}
		expect(matchesPattern("./d0/a.ts", "./d0/*")).toBe(true);
		expect(matchesPattern("./d1/a.ts", "./d0/*")).toBe(false);
	});
});
