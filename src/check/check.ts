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

	for (const declaration of scopes) {
		const end2 = logger.start(`> "${declaration.scope}" Matched file in scope`);
		const filtered = tsFiles.filter((tsFile): boolean => {
			const end3 = logger.start(`> > "${tsFile.relative}" Match file`);
			if (scoped.has(tsFile.absolute)) {
				end3();
				return false;
			}
			const ret = minimatch(tsFile.relative, declaration.scope);
			end3();
			return ret;
		});
		end2();

		checkScope(
			logger,
			declaration,
			filtered,
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
