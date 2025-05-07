import { canonicalize } from "./pattern/canonicalize";

export type PatternInfo = Readonly<{
	scopeName: string;
	scopeLabel: string;
	ruleIndex: number;
	pattern: string;
}>;

export class UnmatchedPatternsTracker {
	readonly #allPatterns: Map<string, PatternInfo> = new Map();
	readonly #matchedPatternKeys: Set<string> = new Set();

	addPattern(info: PatternInfo): void {
		const key = this.#makeKey(info.scopeLabel, info.ruleIndex, info.pattern);

		if (!this.#allPatterns.has(key)) {
			this.#allPatterns.set(key, info);
		}
	}

	markAsMatched(
		rule: Pick<PatternInfo, "scopeLabel" | "ruleIndex" | "pattern">,
	): void {
		const key = this.#makeKey(rule.scopeLabel, rule.ruleIndex, rule.pattern);

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
		return unmatched;
	}

	#makeKey(scopeLabel: string, ruleIndex: number, pattern: string): string {
		const canonical = canonicalize(pattern);
		return JSON.stringify({ scopeLabel, ruleIndex, pattern: canonical });
	}
}
