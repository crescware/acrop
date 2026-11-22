import type { parseImports } from "./parse-imports";

type Parsed = NonNullable<ReturnType<typeof parseImports>>;

type ImportInfo = Readonly<{
	path: Readonly<{
		relative: string;
	}>;
	// Offset of the import source in the file.
	start: number;
}>;

export function findImportPaths(
	imports: Parsed["imports"],
): readonly ImportInfo[] {
	return imports.map((v): ImportInfo => {
		return {
			path: { relative: v.moduleRequest.value },
			start: v.moduleRequest.start,
		};
	});
}
