import { buildNodesFromErrors } from "./build-nodes-from-errors";
import { buildReportNodes } from "./build-report-nodes";
import { buildSummaryReportNode } from "./build-summary-report-node";
import { buildUnscopedReportNode } from "./build-unscoped-report-node";
import type { LogNode } from "./log-tree";

type TsFile = Readonly<{
	relative: string;
	absolute: string;
}>;

type TsFiles = readonly TsFile[];

export function buildNodes(
	errorsRef: Parameters<typeof buildNodesFromErrors>[0],
	reports: Parameters<typeof buildReportNodes>[0],
	tsFiles: TsFiles,
	scoped: Parameters<typeof buildSummaryReportNode>[1],
	needsReportUnscoped: Parameters<typeof buildUnscopedReportNode>[0],
	duration: Parameters<typeof buildSummaryReportNode>[2],
	restrictedImports: Parameters<typeof buildSummaryReportNode>[3],
): readonly LogNode[] {
	const errorsNodes = buildNodesFromErrors(errorsRef);
	const reportNodes = buildReportNodes(reports);

	const unscopedFiles = tsFiles.filter((v) => !scoped.has(v.absolute));
	const unscopedFilesCount = unscopedFiles.length;

	const unscopedReportNodes = buildUnscopedReportNode(
		needsReportUnscoped,
		unscopedFilesCount,
		unscopedFiles,
	);

	const summaryReportNode = buildSummaryReportNode(
		tsFiles.length,
		scoped,
		duration,
		restrictedImports,
		unscopedFilesCount,
	);

	return [
		...errorsNodes,
		...reportNodes,
		...unscopedReportNodes,
		summaryReportNode,
	];
}
