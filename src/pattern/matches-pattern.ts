import { Minimatch } from "minimatch";

import { exists } from "../exists";

type Test = (path: string) => boolean;

// A rule can generate a different pattern for every file. The limit keeps such
// a configuration from holding all of its compiled patterns in memory.
export const compiledPatternLimit = 10_000;

const compiledPatterns = new Map<string, Test>();

/**
 * Returns a test that gives the same answer as `minimatch(path, pattern)`.
 * That function compiles the pattern on every call, which costs far more than
 * the match itself, while the same few patterns are tested against every file
 * and every import.
 */
export function compilePattern(pattern: string): Test {
	const compiled = compiledPatterns.get(pattern);
	if (exists(compiled)) {
		return compiled;
	}

	if (compiledPatterns.size === compiledPatternLimit) {
		compiledPatterns.clear();
	}
	const test = makeTest(new Minimatch(pattern));
	compiledPatterns.set(pattern, test);
	return test;
}

export function matchesPattern(path: string, pattern: string): boolean {
	return compilePattern(pattern)(path);
}

function makeTest(matcher: Minimatch): Test {
	const prefix = literalPrefix(matcher);
	if (prefix === "") {
		return (path) => matcher.match(path);
	}

	// Most paths differ from a pattern in its leading directories. Comparing
	// text settles those without splitting the path into its parts. minimatch
	// reads repeated slashes as one, so a path that has them is left to it.
	return (path) =>
		(path.startsWith(prefix) || path.includes("//")) && matcher.match(path);
}

/**
 * Returns text that every path matched by `matcher` starts with, or "" when
 * no such text can be relied on.
 */
function literalPrefix(matcher: Minimatch): string {
	if (matcher.negate || matcher.isWindows) {
		return "";
	}

	// `set` holds one list of path parts for each alternative that braces
	// expand to. A part without magic is a string and must equal the same part
	// of the path.
	const prefixes = matcher.set.map((parts) => {
		const magic = parts.findIndex((part) => typeof part !== "string");
		// A pattern without magic matches the path it spells out, and that path
		// has no slash after its last part.
		const leading = parts.slice(0, magic === -1 ? -1 : magic);
		return leading.map((part) => `${String(part)}/`).join("");
	});

	return commonPrefix(prefixes);
}

function commonPrefix(texts: readonly string[]): string {
	const [first = "", ...rest] = texts;

	let length = first.length;
	for (const text of rest) {
		let i = 0;
		while (i < length && first[i] === text[i]) {
			i++;
		}
		length = i;
	}

	return first.slice(0, length);
}
