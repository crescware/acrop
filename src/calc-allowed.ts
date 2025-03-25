import { dirname, relative } from "node:path";

import { assertExists } from "./exists/assert-exists";
import type { importConfig } from "./import-config";

type Declaration = Awaited<ReturnType<typeof importConfig>>["scopes"][number];

export function calcAllowed(
	root: string,
	tsPath: string,
	declaration_: Declaration,
): readonly string[] {
	const base = ((): readonly string[] => {
		const declaration = declaration_.rules[0] ?? null;
		assertExists(declaration);

		if (
			typeof declaration.allowed === "object" &&
			Array.isArray(declaration.allowed)
		) {
			return declaration.allowed;
		}

		if (typeof declaration.allowed === "function") {
			return declaration.allowed(`./${relative(root, tsPath)}`) as string[];
		}

		throw new Error(
			"Invalid configuration: rules[0].allowed is not properly defined",
		);
	})();

	return (
		[
			...base,
			(declaration_.disallowSiblingImportsUnlessAllow ?? false)
				? null
				: `./${relative(root, dirname(tsPath))}/**/*`,
		]
			.filter((v) => v !== null)
			// Add a glob pattern that allows the directory itself to include index.ts
			.flatMap((v) => [v, v.replace(/\/\*\*\/\*$/, "")])
	);
}
