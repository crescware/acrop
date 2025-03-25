import { dirname, relative } from "node:path";

import { assertExists } from "./exists/assert-exists";
import { exists } from "./exists/exists";
import type { importConfig } from "./import-config";

type Declaration = Awaited<ReturnType<typeof importConfig>>["scopes"][number];

export type Rules = Readonly<{
	allowed: readonly string[];
	restricted: readonly string[];
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
): Rules {
	const relativePath = `./${relative(root, tsPath)}`;

	const allowedPaths: /* readwrite */ string[] = [];
	const restrictedPaths: /* readwrite */ string[] = [];

	const rule = declaration.rules[0] ?? null;

	if (exists(rule)) {
		allowedPaths.push(...processAllowedRule(rule, relativePath));
		restrictedPaths.push(...processRestrictedRule(rule, relativePath));
	}

	const finalAllowed = [
		...allowedPaths,
		(declaration.disallowSiblingImportsUnlessAllow ?? false)
			? null
			: `./${relative(root, dirname(tsPath))}/**/*`,
	]
		.filter((v) => v !== null)
		.flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, "")]) as string[];

	return {
		allowed: finalAllowed,
		restricted: restrictedPaths,
	};
}
