import { dirname, relative } from "node:path";

import { assertExists, exists } from "../exists";
import type { importConfig } from "../import-config";

type Declaration = Awaited<ReturnType<typeof importConfig>>["scopes"][number];

export type Rule = Readonly<{
	type: "allowed" | "restricted";
	pattern: string;
	scopeLabel: string;
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
): readonly Rule[] | null {
	if (!("sibling" in rule)) {
		return null;
	}

	const basePath = `./${relative(root, dirname(tsPath))}`;
	const patterns = [`${basePath}/**/*`, basePath];
	const ruleType = rule.sibling ? "allowed" : "restricted";
	const ruleName = getRuleName(rule);
	const scopeLabel = createScopeLabel(scopeName, ruleIndex, ruleName);

	return patterns.map((pattern) => {
		return {
			type: ruleType,
			pattern,
			scopeLabel,
		};
	});
}

function processAllowedRule(
	rule: NonNullable<Declaration["rules"][number]>,
	relativePath: string,
	scopeName: string,
	ruleIndex: number,
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

	return expandPatterns(paths).map((pattern) => ({
		type: "allowed" as const,
		pattern,
		scopeLabel,
	}));
}

function processRestrictedRule(
	rule: NonNullable<Declaration["rules"][number]>,
	relativePath: string,
	scopeName: string,
	ruleIndex: number,
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

	return expandPatterns(paths).map((pattern) => ({
		type: "restricted" as const,
		pattern,
		scopeLabel,
	}));
}

type RulesResult = Readonly<{
	rules: readonly Rule[];
	scope: string;
}>;

export function calcRules(
	root: string,
	tsPath: string,
	declaration: Declaration,
): RulesResult {
	const relativePath = `./${relative(root, tsPath)}`;

	const orderedRules: /* readwrite */ Rule[] = [];

	for (let i = 0; i < declaration.rules.length; i++) {
		const rule = declaration.rules[i];
		assertExists(rule);

		const siblingRules = processSiblingRule(
			rule,
			tsPath,
			root,
			declaration.scope,
			i,
		);

		if (exists(siblingRules)) {
			orderedRules.push(...siblingRules);
			continue;
		}

		const allowedRules = processAllowedRule(
			rule,
			relativePath,
			declaration.scope,
			i,
		);
		orderedRules.push(...allowedRules);

		const restrictedRules = processRestrictedRule(
			rule,
			relativePath,
			declaration.scope,
			i,
		);
		orderedRules.push(...restrictedRules);
	}

	return { rules: orderedRules, scope: declaration.scope };
}
