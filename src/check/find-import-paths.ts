import { calcLineNumber } from "../calc-line-number";
import type { parseImports } from "./parse-imports";

type Parsed = NonNullable<ReturnType<typeof parseImports>>;

type ImportInfo = Readonly<{
	path: Readonly<{
		relative: string;
	}>;
	line: number;
	column: number;
}>;

export function findImportPaths(
	imports: Parsed["imports"],
	positions: Parsed["positions"],
): readonly ImportInfo[] {
	return imports.map((v): ImportInfo => {
		const { line, column } = calcLineNumber(
			positions,
			v.moduleRequest.start + 1,
		);
		return { path: { relative: v.moduleRequest.value }, line, column };
	});
}
