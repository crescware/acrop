// src/testing/main-import-config-invalid.test.ts
import { beforeEach, describe, expect, test, vi } from "vitest";
import { importConfig } from "../import-config";
import { main } from "../main";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));

describe("main() – invalid config causes rejection", () => {
	beforeEach(() => {
		// `main()` がこの例外をそのまま surface させるか確認する
		vi.mocked(importConfig).mockRejectedValue(
			new Error("Valibot schema validation failed"),
		);
		// 必須の argv[2] (configPath) を仮に与える
		process.argv.push("invalid-config.ts");
	});

	test("should reject with the same error", async () => {
		await expect(main()).rejects.toThrow(/validation failed/);
	});
});
