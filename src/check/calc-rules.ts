import { dirname, relative } from "node:path";
import type { importConfig } from "../import-config";

type Declaration = Awaited<ReturnType<typeof importConfig>>["scopes"][number];

export type Rule = Readonly<{
	type: "allowed" | "restricted";
	pattern: string;
}>;

function expandPatterns(patterns: readonly string[]): readonly string[] {
	return patterns.flatMap((pattern) => {
		if (pattern.endsWith("/**/*")) {
			return [pattern, pattern.replace(/\/\*\*\/\*$/, "")];
		}

		return [pattern, `${pattern}/**/*`];
	});
}

function processSiblingRule(
	rule: NonNullable<Declaration["rules"][number]>,
	tsPath: string,
	root: string,
):
	| readonly Readonly<{
			type: "allowed" | "restricted";
			pattern: string;
	  }>[]
	| null {
	if (!("sibling" in rule)) {
		return null;
	}

	const basePath = `./${relative(root, dirname(tsPath))}`;
	const patterns = [`${basePath}/**/*`, basePath];

	const ruleType = rule.sibling ? "allowed" : "restricted";

	return patterns.map((pattern) => {
		return { type: ruleType, pattern };
	});
}

function processAllowedRule(
	rule: NonNullable<Declaration["rules"][number]>,
	relativePath: string,
): readonly string[] {
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

	return expandPatterns(paths);
}

function processRestrictedRule(
	rule: NonNullable<Declaration["rules"][number]>,
	relativePath: string,
): readonly string[] {
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

	return expandPatterns(paths);
}

export function calcRules(
	root: string,
	tsPath: string,
	declaration: Declaration,
): readonly Rule[] {
	const relativePath = `./${relative(root, tsPath)}`;

	const orderedRules: /* readwrite */ Rule[] = [];

	for (const rule of declaration.rules) {
		const siblingRules = processSiblingRule(rule, tsPath, root);
		if (siblingRules !== null) {
			orderedRules.push(...siblingRules);
			continue;
		}

		const allowedPaths = processAllowedRule(rule, relativePath);
		for (const pattern of allowedPaths) {
			orderedRules.push({ type: "allowed", pattern });
		}

		const restrictedPaths = processRestrictedRule(rule, relativePath);
		for (const pattern of restrictedPaths) {
			orderedRules.push({ type: "restricted", pattern });
		}
	}

	return orderedRules;
}
