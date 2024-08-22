import { dirname, relative } from "node:path";

import { importConfig } from "./import-config";

type Declaration = Awaited<ReturnType<typeof importConfig>>["scopes"][number];

export function calcAllowed(
  root: string,
  tsPath: string,
  declaration: Declaration,
): readonly string[] {
  const base = ((): readonly string[] => {
    if (
      typeof declaration.allowed === "object" &&
      Array.isArray(declaration.allowed)
    ) {
      return declaration.allowed;
    }

    if (typeof declaration.allowed === "function") {
      return declaration.allowed(`./${relative(root, tsPath)}`) as string[];
    }

    throw new Error("invalid");
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
