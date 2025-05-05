import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { importConfig } from "../import-config";
import type { config$ } from "../import-config/config";
import { outputFromTree } from "../log-reports";
import { main } from "../main";
import { expectFilesChecked } from "./expect-utils";
import { setupMainTest } from "./test-utils";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));
vi.mock("../log-reports", () => ({ outputFromTree: vi.fn() }));

const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [{ scope: "./a/**/*", rules: [{ allowed: ["./a/**/*"] }] }],
};

const { configFilePathAbs } = setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/a.ts", content: "" },
		{ path: "b/b.ts", content: "" }, // ← unscoped
	],
});

describe("main() – --unscoped フラグがある場合", () => {
	let success: boolean;

	beforeEach(async () => {
		/* setupMainTest の beforeEach が走ったあとにフラグを追加 */
		process.argv.push("--unscoped");
		success = await main();
	});

	test("should succeed (true)", () => {
		expect(success).toBe(true);
	});

	test("config path が正しい", () => {
		expect(vi.mocked(importConfig)).toHaveBeenCalledWith(
			expect.anything(),
			configFilePathAbs,
		);
	});

	test("Unscoped Files ノードを含む", () => {
		const treeArg = vi.mocked(outputFromTree).mock.calls[0][0];
		expect(
			treeArg.nodes.some(
				(node: any) =>
					node.type === "text" && node.elements?.[0]?.text === "Unscoped Files",
			),
		).toBe(true);
	});

	test("summary 行の unscoped 数が 1", () => {
		const expected = expectFilesChecked(1, 2, 1);
		const treeArg = vi.mocked(outputFromTree).mock.calls[0][0];

		// summary は常に最後の node
		const summaryRows = treeArg.nodes.at(-1).rows;
		expect(summaryRows[0]).toEqual(expected);
	});
});
