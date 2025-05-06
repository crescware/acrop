import { wildcard } from "./wildcard";

export function canonicalize(pattern: string): string {
	return pattern.endsWith(wildcard)
		? pattern.replace(/\/\*\*\/\*$/, "")
		: pattern;
}
