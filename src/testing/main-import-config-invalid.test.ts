import { beforeEach, describe, expect, test, vi } from "vitest";
import { importConfig } from "../import-config";
import { main } from "../main";

vi.mock("../import-config", () => ({ importConfig: vi.fn() }));

describe("main() – invalid config causes rejection", () => {
	beforeEach(() => {
		vi.mocked(importConfig).mockRejectedValue(
			new Error("Valibot schema validation failed"),
		);

		process.argv.push("invalid-config.ts");
	});

	test("should reject with the same error", async () => {
		await expect(main()).rejects.toThrow(/validation failed/);
	});
});
