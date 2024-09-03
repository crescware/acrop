import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import * as logReportsMod from "../../log-reports";
import { timeEndMock } from "../../owned-time-span.mock";

const outputFromTreeSpy = vi.spyOn(logReportsMod, "outputFromTree");

function read(path: string): string {
  return readFileSync(join(import.meta.dirname, path), "utf8");
}

describe("Case 03", () => {
  beforeEach(async () => {
    const argvSpy = vi.spyOn(globalThis.process, "argv", "get");
    const cwdSpy = vi.spyOn(globalThis.process, "cwd");
    argvSpy.mockReturnValue(["nodePath", "entryPath", "./acrop.config.ts"]);
    cwdSpy.mockReturnValue(import.meta.dirname);
    timeEndMock.mockReturnValue(1.23);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Precondition", () => {
    describe("acrop.config.ts", () => {
      let config: (typeof import("./acrop.config"))["default"];

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

      test(`should disallow in the scope`, () => {
        expect(config.scopes[0]?.allowed).toEqual([]);
      });

      test(`should disallow in the scope`, () => {
        expect(config.scopes[0]?.disallowSiblingImportsUnlessAllow).toEqual(
          true,
        );
      });
    });

    describe("a1.ts", () => {
      let content: string;

      beforeEach(() => {
        content = read("./a/a1.ts");
      });

      test("should contain import statement for b1", () => {
        expect(content).toContain(`../b/b1`);
      });

      test("should contain import statement for sibling file", () => {
        expect(content).toContain(`./a2`);
      });
    });
  });

  describe("main()", () => {
    let main: (typeof import("../../main"))["main"];
    let result: Awaited<ReturnType<typeof main>>;

    beforeEach(async () => {
      ({ main } = await import("../../main"));
      result = await main();
    });

    test("should return false when preconditions are met", async () => {
      expect(result).toEqual(false);
    });

    test("should match the generated log output structure against the snapshot", async () => {
      expect(outputFromTreeSpy.mock.calls[0]?.[0]).toMatchSnapshot();
    });
  });
});
