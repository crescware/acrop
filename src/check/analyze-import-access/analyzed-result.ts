type Path = Readonly<{
	relative: string;
}>;

type AllowedResult = Readonly<{
	path: Path;
	isAllowed: true;
	scopeLabel: string;
}>;

// Only a restricted import appears in the report, so only it has a position.
export type RestrictedResult = Readonly<{
	path: Path;
	line: number;
	column: number;
	isAllowed: false;
	scopeLabel: string;
}>;

export type AnalyzedResult = AllowedResult | RestrictedResult;
