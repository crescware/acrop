import { dirname, relative } from "node:path";

import { assertExists, exists } from "../exists";
import type { importConfig } from "../import-config";
import type { UnmatchedPatternsTracker } from "../unmatched-pattern-tracker";

type Declaration = Awaited<ReturnType<typeof importConfig>>["scopes"][number];

export type Rule = Readonly<{
	type: "allowed" | "restricted";
	pattern: string;
	scopeLabel: string;
	ruleIndex: number;
}>;

function expandPatterns(patterns: readonly string[]): readonly string[] {
	return patterns.flatMap((pattern) => {
		if (pattern.endsWith("/**/*")) {
			return [pattern, pattern.replace(/\/\*\*\/\*$/, "")];
		}
		return [pattern, `${pattern}/**/*`];
	});
}

function createScopeLabel(
	scopeName: string,
	ruleIndex: number,
	ruleName: string | null,
): string {
	return ruleName ? ruleName : `${scopeName}:rule[${ruleIndex}]`;
}

function getRuleName(
	rule: NonNullable<Declaration["rules"][number]>,
): string | null {
	if (!("name" in rule) || !exists(rule.name)) {
		return null;
	}
	return rule.name.length === 0 ? null : rule.name;
}

function processSiblingRule(
	rule: NonNullable<Declaration["rules"][number]>,
	tsPath: string,
	root: string,
	scopeName: string,
	ruleIndex: number,
	trackerRef: UnmatchedPatternsTracker,
): readonly Rule[] | null {
	if (!("sibling" in rule)) {
		return null;
	}

	const basePath = `./${relative(root, dirname(tsPath))}`;
	const patterns = [`${basePath}/**/*`, basePath];
	const ruleType = rule.sibling ? "allowed" : "restricted";
	const ruleName = getRuleName(rule);
	const scopeLabel = createScopeLabel(scopeName, ruleIndex, ruleName);

	const rules: Rule[] = [];
	for (const pattern of patterns) {
		const rule = {
			type: ruleType,
			pattern,
			scopeLabel,
			ruleIndex,
		} as const satisfies Rule;

		trackerRef.addPattern({ scopeLabel, ruleIndex, pattern });
		rules.push(rule);
	}

	return rules;
}

function processAllowedRule(
	rule: NonNullable<Declaration["rules"][number]>,
	relativePath: string,
	scopeName: string,
	ruleIndex: number,
	trackerRef: UnmatchedPatternsTracker,
): readonly Rule[] {
	if (!("allowed" in rule)) {
		return [];
	}

	const paths: readonly string[] = (() => {
		if (typeof rule.allowed === "object" && Array.isArray(rule.allowed)) {
			return rule.allowed;
		}
		if (typeof rule.allowed === "function") {
			return rule.allowed(relativePath) as string[];
		}
		throw new Error(
			"Invalid configuration: rule.allowed is not properly defined",
		);
	})();

	const ruleName = getRuleName(rule);
	const scopeLabel = createScopeLabel(scopeName, ruleIndex, ruleName);
	const expandedPatterns = expandPatterns(paths);

	const rules: Rule[] = [];
	for (const pattern of expandedPatterns) {
		const rule = {
			type: "allowed",
			pattern,
			scopeLabel,
			ruleIndex,
		} as const satisfies Rule;

		trackerRef.addPattern({ scopeLabel, ruleIndex, pattern });
		rules.push(rule);
	}

	return rules;
}

function processRestrictedRule(
	rule: NonNullable<Declaration["rules"][number]>,
	relativePath: string,
	scopeName: string,
	ruleIndex: number,
	trackerRef: UnmatchedPatternsTracker,
): readonly Rule[] {
	if (!("restricted" in rule)) {
		return [];
	}

	const paths: readonly string[] = (() => {
		if (typeof rule.restricted === "object" && Array.isArray(rule.restricted)) {
			return rule.restricted;
		}
		if (typeof rule.restricted === "function") {
			return rule.restricted(relativePath) as string[];
		}
		throw new Error(
			"Invalid configuration: rule.restricted is not properly defined",
		);
	})();

	const ruleName = getRuleName(rule);
	const scopeLabel = createScopeLabel(scopeName, ruleIndex, ruleName);
	const expandedPatterns = expandPatterns(paths);

	const rules: Rule[] = [];
	for (const pattern of expandedPatterns) {
		const rule = {
			type: "restricted",
			pattern,
			scopeLabel,
			ruleIndex,
		} as const satisfies Rule;

		trackerRef.addPattern({ scopeLabel, ruleIndex, pattern });
		rules.push(rule);
	}

	return rules;
}

type RulesResult = Readonly<{
	rules: readonly Rule[];
	scope: string;
}>;

export function calcRules(
	root: string,
	tsPath: string,
	declaration: Declaration,
	trackerRef: UnmatchedPatternsTracker,
): RulesResult {
	const relativePath = `./${relative(root, tsPath)}`;

	const orderedRules: Rule[] = [];

	for (const [index, rule] of declaration.rules.entries()) {
		assertExists(rule);

		const siblingRules = processSiblingRule(
			rule,
			tsPath,
			root,
			declaration.scope,
			index,
			trackerRef,
		);

		if (exists(siblingRules)) {
			orderedRules.push(...siblingRules);
			continue;
		}

		const allowedRules = processAllowedRule(
			rule,
			relativePath,
			declaration.scope,
			index,
			trackerRef,
		);
		orderedRules.push(...allowedRules);

		const restrictedRules = processRestrictedRule(
			rule,
			relativePath,
			declaration.scope,
			index,
			trackerRef,
		);
		orderedRules.push(...restrictedRules);
	}

	return {
		rules: orderedRules,
		scope: declaration.scope,
	};
}
