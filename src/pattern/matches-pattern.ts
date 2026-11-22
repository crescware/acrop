import { Minimatch } from "minimatch";

import { exists } from "../exists";

// A rule can generate a different pattern for every file. The limit keeps such
// a configuration from holding all of its compiled patterns in memory.
export const compiledPatternLimit = 10_000;

const compiledPatterns = new Map<string, Minimatch>();

function compile(pattern: string): Minimatch {
	const compiled = compiledPatterns.get(pattern);
	if (exists(compiled)) {
		return compiled;
	}

	if (compiledPatterns.size === compiledPatternLimit) {
		compiledPatterns.clear();
	}
	const matcher = new Minimatch(pattern);
	compiledPatterns.set(pattern, matcher);
	return matcher;
}

/**
 * Gives the same answer as `minimatch(path, pattern)`. That function compiles
 * the pattern on every call, which costs far more than the match itself, while
 * the same few patterns are tested against every file and every import.
 */
export function matchesPattern(path: string, pattern: string): boolean {
	return compile(pattern).match(path);
}
