import type { importConfig } from "../import-config";
import type { Report } from "../log-tree";
import { compilePattern } from "../pattern/matches-pattern";
import {
	type PatternInfo,
	UnmatchedPatternsTracker,
} from "../unmatched-pattern-tracker";
import type { VerboseLogger } from "../verbose-logger";
import { checkScope } from "./check-scope";
import type { ErrorReport } from "./error-report";

type Return = Readonly<{
	scoped: Set<string>;
	errorsRef: readonly ErrorReport[];
	reports: readonly Report[];
	unmatchedPatterns: readonly PatternInfo[];
}>;

export function check(
	logger: VerboseLogger,
	scopes: Awaited<ReturnType<typeof importConfig>>["scopes"],
	tsFiles: readonly { relative: string; absolute: string }[],
	root: string,
): Return {
	const end1 = logger.startWithHeader("Check files");

	const scoped = new Set<string>();
	const errorsRef = [] as ErrorReport[];
	const reports = [] as Report[];

	const unmatchedPatterns: PatternInfo[] = [];
	const remaining = new Set(tsFiles);
	for (const declaration of scopes) {
		const end2 = logger.start(`> "${declaration.scope}" Matched file in scope`);
		const matchedFiles: (typeof tsFiles)[number][] = [];
		const matchesScope = compilePattern(declaration.scope);
		for (const file of remaining) {
			const end3 = logger.start(`> > "${file.relative}" Match file`);
			if (matchesScope(file.relative)) {
				matchedFiles.push(file);
				remaining.delete(file);
			}
			end3();
		}
		end2();

		const tracker = new UnmatchedPatternsTracker(declaration);
		checkScope(
			logger,
			declaration,
			matchedFiles,
			root,
			scoped,
			errorsRef,
			reports,
			tracker,
		);
		for (const pattern of tracker.getUnmatchedPatterns()) {
			unmatchedPatterns.push(pattern);
		}
	}

	const ret = {
		scoped,
		errorsRef,
		reports,
		unmatchedPatterns,
	} satisfies Return;
	end1();
	return ret;
}
