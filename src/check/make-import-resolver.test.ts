import { dirname, relative, resolve } from "node:path";
import { describe, expect, test } from "vitest";

import { makeImportResolver } from "./make-import-resolver";

describe("makeImportResolver()", () => {
	const root = "/work/project";

	test.each([
		{ importer: "src/a.ts", specifier: "./b", expected: "./src/b" },
		{ importer: "src/a.ts", specifier: "../lib/b", expected: "./lib/b" },
		{ importer: "src/a.ts", specifier: "react", expected: "./src/react" },
		{ importer: "src/a.ts", specifier: "..", expected: "./" },
		{ importer: "src/a.ts", specifier: "../../out", expected: "./../out" },
		{ importer: "a.ts", specifier: "./b", expected: "./b" },
	])(
		"resolves $specifier imported by $importer to $expected",
		({ importer, specifier, expected }) => {
			const resolveImport = makeImportResolver(root, resolve(root, importer));

			expect(resolveImport(specifier)).toBe(expected);
		},
	);

	const importers = ["a.ts", "src/a.ts", "src/deep/er/a.ts", "../outside/a.ts"];
	const specifiers = [
		"",
		".",
		"./",
		"..",
		"../",
		"../..",
		"../../..",
		"../../../../x",
		"./b",
		"./b/",
		"../b",
		"./b/../c/./d",
		"b//c",
		"react",
		"@/alias",
		"node:path",
		"..b",
		"./..b/c",
		"../project/src/b",
		"../../project/b",
		"/abs/b",
		"/work/project/src/b",
		"./日本語",
	];

	test.each(importers.flatMap((importer) => ({ importer })))(
		"agrees with resolving against the directory of $importer",
		({ importer }) => {
			const absolute = resolve(root, importer);
			const resolveImport = makeImportResolver(root, absolute);

			for (const specifier of specifiers) {
				const viaAbsolutePath = `./${relative(
					root,
					resolve(dirname(absolute), specifier),
				)}`;
				expect(resolveImport(specifier), specifier).toBe(viaAbsolutePath);
			}
		},
	);
});
