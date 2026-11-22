import type { ParsedImports } from "./parse-imports";

type ImportInfo = Readonly<{
	path: Readonly<{
		relative: string;
	}>;
	// Offset of the import source in the file.
	start: number;
}>;

export function findImportPaths(
	imports: ParsedImports["imports"],
): readonly ImportInfo[] {
	return imports.map((v): ImportInfo => {
		return {
			path: { relative: v.moduleRequest.value },
			start: v.moduleRequest.start,
		};
	});
}
