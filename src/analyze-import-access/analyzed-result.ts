type Path = Readonly<{
	relative: string;
}>;

export type AnalyzedResult = Readonly<{
	path: Path;
	line: number;
	column: number;
	isAllowed: boolean;
}>;
