import { minimatch } from "minimatch";

import type { importConfig } from "../import-config";
import type { Report } from "../log-tree";
import type { UnmatchedPatternsTracker } from "../unmatched-pattern-tracker";
import type { VerboseLogger } from "../verbose-logger";
import { checkScope } from "./check-scope";
import type { ErrorReport } from "./error-report";

type Return = Readonly<{
	scoped: Set<string>;
	errorsRef: readonly ErrorReport[];
	reports: readonly Report[];
}>;

export function check(
	logger: VerboseLogger,
	scopes: Awaited<ReturnType<typeof importConfig>>["scopes"],
	tsFiles: readonly { relative: string; absolute: string }[],
	root: string,
	trackerRef: UnmatchedPatternsTracker,
): Return {
	const end1 = logger.startWithHeader("Check files");

	const scoped = new Set<string>();
	const errorsRef = [] as ErrorReport[];
	const reports = [] as Report[];

	const remaining = new Set(tsFiles);
	for (const declaration of scopes) {
		const end2 = logger.start(`> "${declaration.scope}" Matched file in scope`);
		const matchedFiles: (typeof tsFiles)[number][] = [];
		for (const file of remaining) {
			const end3 = logger.start(`> > "${file.relative}" Match file`);
			if (minimatch(file.relative, declaration.scope)) {
				matchedFiles.push(file);
				remaining.delete(file);
			}
			end3();
		}
		end2();

		checkScope(
			logger,
			declaration,
			matchedFiles,
			root,
			scoped,
			errorsRef,
			reports,
			trackerRef,
		);
	}

	const ret = { scoped, errorsRef, reports } satisfies Return;
	end1();
	return ret;
}
