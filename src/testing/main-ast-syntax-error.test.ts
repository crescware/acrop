// src/testing/main-ast-syntax-error.test.ts
import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import type { config$ } from "../import-config/config";
import { outputFromTree } from "../log-reports";
import { main } from "../main";
import { setupMainTest } from "./test-utils";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));
vi.mock("../log-reports", () => ({ outputFromTree: vi.fn() }));

const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [{ scope: "./**/*", rules: [{ allowed: ["./**/*"] }] }],
};

setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		// わざと構文エラー
		{ path: "a/bad.ts", content: "import" },
	],
});

describe("main() – syntax error file present", () => {
	let success: boolean;

	beforeEach(async () => {
		success = await main();
	});

	test("should succeed (true) even with parser errors", () => {
		expect(success).toBe(true);
	});

	test("outputFromTree should contain a red-colored error node", () => {
		const treeArg = vi.mocked(outputFromTree).mock.calls[0]?.[0];
		const redNode = treeArg?.nodes.find(
			(n: any) =>
				n.type === "text" &&
				n.elements?.[0]?.attributes?.some(
					(a: any) => a.type === "color" && a.value === "red",
				),
		);
		expect(redNode).toBeDefined();
	});
});
