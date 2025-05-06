import type { InferOutput } from "valibot";
import { beforeEach, describe, expect, test, vi } from "vitest";

import type { config$ } from "../import-config/config";
import { main } from "../main";
import { setupMainTest } from "./test-utils";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));
vi.mock("../log-reports", () => ({ outputFromTree: vi.fn() }));

const testConfig: InferOutput<typeof config$>["default"] = {
	root: ".",
	scopes: [
		{
			scope: "./a/**/*",
			only: true,
			rules: [{ allowed: ["./a/**/*"] }],
		},
		{
			scope: "./b/**/*",
			rules: [{ allowed: ["./b/**/*"] }],
		},
	],
};

setupMainTest({
	configFileName: "acrop.config.ts",
	config: testConfig,
	files: [
		{ path: "a/a.ts", content: "" },
		{ path: "b/b.ts", content: "" },
	],
});

describe("main() – 'only: true' スコープがある場合", () => {
	let success: boolean;
	beforeEach(async () => {
		success = await main();
	});

	test("should return false (ビルド失敗)", () => {
		expect(success).toBe(false);
	});
});
