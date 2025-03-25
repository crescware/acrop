import { dirname, relative } from "node:path";

import { assertExists } from "./exists/assert-exists";
import { exists } from "./exists/exists";
import type { importConfig } from "./import-config";

type Declaration = Awaited<ReturnType<typeof importConfig>>["scopes"][number];

export type Rule = Readonly<{
	type: "allowed" | "restricted";
	pattern: string;
}>;

function processAllowedRule(
	rule: NonNullable<Declaration["rules"][number]>,
	relativePath: string,
): readonly string[] {
	if (!("allowed" in rule)) {
		return [];
	}

	if (typeof rule.allowed === "object" && Array.isArray(rule.allowed)) {
		return rule.allowed;
	}

	if (typeof rule.allowed === "function") {
		return rule.allowed(relativePath) as string[];
	}

	throw Error("Invalid configuration: rule.allowed is not properly defined");
}

function processRestrictedRule(
	rule: NonNullable<Declaration["rules"][number]>,
	relativePath: string,
): readonly string[] {
	if (!("restricted" in rule)) {
		return [];
	}

	if (typeof rule.restricted === "object" && Array.isArray(rule.restricted)) {
		return rule.restricted;
	}

	if (typeof rule.restricted === "function") {
		return rule.restricted(relativePath) as string[];
	}

	throw Error("Invalid configuration: rule.restricted is not properly defined");
}

export function calcRules(
	root: string,
	tsPath: string,
	declaration: Declaration,
): readonly Rule[] {
	const relativePath = `./${relative(root, tsPath)}`;

	const orderedRules: /* readwrite */ Rule[] = [];

	for (const rule of declaration.rules) {
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
