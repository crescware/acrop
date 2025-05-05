export type UnmatchedPatternsFlags = Readonly<{
	needsCheck: boolean;
	shouldFail: boolean;
}>;

export const defaultUnmatchedPatternsFlags = {
	needsCheck: false,
	shouldFail: false,
} satisfies UnmatchedPatternsFlags;
