import type { importConfig } from "./import-config";
import { canonicalize } from "./pattern/canonicalize";

export type PatternInfo = Readonly<{
	scopeName: string;
	ruleIndex: number;
	pattern: string;
}>;

export class UnmatchedPatternsTracker {
	readonly #allPatterns: Map<string, PatternInfo> = new Map();
	readonly #matchedPatternKeys: Set<string> = new Set();

	constructor(
		declaration: Awaited<ReturnType<typeof importConfig>>["scopes"][number],
	) {
		for (const [ruleIndex, rule] of declaration.rules.entries()) {
			if ("sibling" in rule) {
				continue;
			}
			const patterns = "allowed" in rule ? rule.allowed : rule.restricted;
			if (Array.isArray(patterns)) {
				for (const pattern of patterns) {
					this.addPattern({ scopeName: declaration.scope, ruleIndex, pattern });
				}
			}
		}
	}

	addPattern(info: PatternInfo): void {
		const key = this.#makeKey(info);

		if (!this.#allPatterns.has(key)) {
			this.#allPatterns.set(key, info);
		}
	}

	markAsMatched(info: PatternInfo): void {
		const key = this.#makeKey(info);

		if (this.#allPatterns.has(key)) {
			this.#matchedPatternKeys.add(key);
		}
	}

	getUnmatchedPatterns(): readonly PatternInfo[] {
		const unmatched: PatternInfo[] = [];
		for (const [key, info] of this.#allPatterns.entries()) {
			if (!this.#matchedPatternKeys.has(key)) {
				unmatched.push(info);
			}
		}
		return unmatched.sort((a, b) => a.ruleIndex - b.ruleIndex);
	}

	#makeKey({ scopeName, ruleIndex, pattern }: PatternInfo): string {
		const canonical = canonicalize(pattern);
		return JSON.stringify({ scopeName, ruleIndex, pattern: canonical });
	}
}
