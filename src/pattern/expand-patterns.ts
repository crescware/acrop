import { wildcard } from "./wildcard";

export function expandPatterns(patterns: readonly string[]): readonly string[] {
	return patterns.flatMap((pattern) => {
		if (pattern.endsWith(wildcard)) {
			return [pattern, pattern.replace(/\/\*\*\/\*$/, "")];
		}

		return [pattern, [pattern, wildcard].join("")];
	});
}
