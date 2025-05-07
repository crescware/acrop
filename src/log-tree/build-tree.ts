import { buildNodes } from "./build-nodes";
import type { LogTree } from "./log-tree";

type Params = Parameters<typeof buildNodes>;

export function buildTree(
	errorsRef: Params[0],
	reports: Params[1],
	tsFiles: Params[2],
	scoped: Params[3],
	duration: Params[4],
	restrictedImports: Params[5],
	unmatchedPatterns: Params[6],
	cliConfig: Params[7],
): LogTree {
	return {
		nodes: buildNodes(
			errorsRef,
			reports,
			tsFiles,
			scoped,
			duration,
			restrictedImports,
			unmatchedPatterns,
			cliConfig,
		),
	};
}
