import { describe, test, expect } from "vitest";

import { buildNodesFromErrors } from "./build-nodes-from-errors";

type Expected = ReturnType<typeof buildNodesFromErrors>;
type Reports = Parameters<typeof buildNodesFromErrors>[0];

type Case = Readonly<{
  reports: Reports;
  expected: Expected;
}>;

describe("buildNodesFromError()", () => {
  test.each([
    {
      reports: [],
      expected: [],
    },
    {
      reports: [
        {
          path: "./a.ts",
          errors: ["line a0", "line a1"],
        },
        {
          path: "./b.ts",
          errors: ["line b0", "line b1"],
        },
      ],
      expected: [
        {
          type: "text",
          elements: [
            { text: "./a.ts", attributes: [{ type: "color", value: "red" }] },
          ],
          children: [
            { type: "text", elements: [{ text: "line a0" }] },
            { type: "text", elements: [{ text: "line a1" }] },
          ],
        },
        {
          type: "text",
          elements: [
            { text: "./b.ts", attributes: [{ type: "color", value: "red" }] },
          ],
          children: [
            { type: "text", elements: [{ text: "line b0" }] },
            { type: "text", elements: [{ text: "line b1" }] },
          ],
        },
      ],
    },
  ] as const satisfies Case[])(
    "should build nodes correctly %#",
    ({ reports, expected }) => {
      const actual = buildNodesFromErrors(reports);
      expect(actual).toEqual(expected);
    },
  );
});
