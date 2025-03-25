import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { outputFromTreeSpy } from "../../log-reports/output-from-tree.mock";
import { prepareMocks } from "../prepare-mocks";

describe("Case 01", () => {
	let read: ReturnType<typeof prepareMocks>["read"];

	beforeEach(() => {
		({ read } = prepareMocks(import.meta.dirname));
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("Precondition", () => {
		describe("acrop.config.ts", () => {
			let config: typeof import("./acrop.config")["default"];

			beforeEach(async () => {
				config = (await import("./acrop.config")).default;
			});

			test("should have root set to current directory", () => {
				expect(config.root).toEqual(".");
			});

			test("should have one scope defined", () => {
				expect(config.scopes.length).toEqual(1);
			});

			test(`should have a scope for "./a/**/*"`, () => {
				expect(config.scopes[0]?.scope).toEqual("./a/**/*");
			});

			test(`should allow "./a" and "./b" in the scope`, () => {
				expect(config.scopes[0]?.rules[0]?.allowed).toEqual([
					"./a/**/*",
					"./b/**/*",
				]);
			});
		});

		describe("a1.ts", () => {
			let content: string;

			beforeEach(() => {
				content = read("./a/a1.ts");
			});

			test("should contain import statement for b1", () => {
				expect(content).toContain("../b/b1");
			});

			test("should contain import statement for sibling file", () => {
				expect(content).toContain("./a2");
			});
		});
	});

	describe("main()", () => {
		let main: typeof import("../../main")["main"];
		let result: Awaited<ReturnType<typeof main>>;

		beforeEach(async () => {
			({ main } = await import("../../main"));
			result = await main();
		});

		test("should return true when preconditions are met", async () => {
			expect(result).toEqual(true);
		});

		test("should match the generated log output structure against the snapshot", async () => {
			expect(outputFromTreeSpy.mock.calls[0]?.[0]).toMatchSnapshot();
		});
	});
});
