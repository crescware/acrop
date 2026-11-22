import { minimatch } from "minimatch";
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

	// A path that cannot start the way the pattern requires is rejected without
	// asking minimatch. These patterns and paths are the ones where working out
	// that start is delicate.
	const patterns = [
		"./lib/a/**/*",
		"./lib/a",
		"./lib/a/",
		"./lib/a/*.ts",
		"./lib/{a,b}/**/*",
		"./lib/{a,ab}/x",
		"./lib/a/../b/*",
		"./lib/{a/..,b}/x",
		"./lib/a/.{.,x}/b",
		"./lib/./a/*",
		"./lib//a/*",
		"./lib/a\\*b/*",
		"./lib/[a]/x",
		"./**/a/*",
		"/lib/a/*",
		"lib/a/*",
		"!./lib/a/*",
		".",
		"./",
	];
	const paths = [
		"",
		".",
		"./",
		"./lib",
		"./lib/",
		"./lib/a",
		"./lib/a/",
		"./lib/a/x",
		"./lib/a/x.ts",
		"./lib/a/b/x",
		"./lib/b/x",
		"./lib/ab/x",
		"./lib/x",
		"./lib/a*b/x",
		"./lib/.x/b",
		"./lib/a/.x/b",
		"./lib/./a/x",
		"./lib//a/x",
		".//lib/a/x",
		"./lib/a//x",
		"./other/a/x",
		"/lib/a/x",
		"lib/a/x",
	];

	test.each(patterns.map((pattern) => ({ pattern })))(
		"agrees with minimatch on every path for $pattern",
		({ pattern }) => {
			for (const path of paths) {
				expect(matchesPattern(path, pattern), path).toBe(
					minimatch(path, pattern),
				);
			}
		},
	);

	test("stays correct after compiling more patterns than it keeps", () => {
		for (let i = 0; i <= compiledPatternLimit; i++) {
			expect(matchesPattern(`./d${i}/a.ts`, `./d${i}/*`)).toBe(true);
		}
		expect(matchesPattern("./d0/a.ts", "./d0/*")).toBe(true);
		expect(matchesPattern("./d1/a.ts", "./d0/*")).toBe(false);
	});
});
