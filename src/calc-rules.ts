import { dirname, relative } from "node:path";

import { assertExists } from "./exists/assert-exists";
import type { importConfig } from "./import-config";

type Declaration = Awaited<ReturnType<typeof importConfig>>["scopes"][number];

export function calcRules(
	root: string,
	tsPath: string,
	declaration: Declaration,
): readonly string[] {
	const base = ((): readonly string[] => {
		const rule = declaration.rules[0] ?? null;
		assertExists(rule);

		if ("allowed" in rule) {
			if (typeof rule.allowed === "object" && Array.isArray(rule.allowed)) {
				return rule.allowed;
			}

			if (typeof rule.allowed === "function") {
				return rule.allowed(`./${relative(root, tsPath)}`) as string[];
			}

			throw Error(
				"Invalid configuration: rule.allowed is not properly defined",
			);
		}

		if ("restricted" in rule) {
			return [];
		}

		throw new Error(
			"Invalid configuration: rule is neither allowed nor restricted",
		);
	})();

	return (
		[
			...base,
			(declaration.disallowSiblingImportsUnlessAllow ?? false)
				? null
				: `./${relative(root, dirname(tsPath))}/**/*`,
		]
			.filter((v) => v !== null)
			// Add a glob pattern that allows the directory itself to include index.ts
			.flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, "")])
	);
}
