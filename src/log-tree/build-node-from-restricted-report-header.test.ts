import { describe, test, expect } from "vitest";

import { buildNodeFromRestrictedReportHeader } from "./build-node-from-restricted-report-header";

type Expected = ReturnType<typeof buildNodeFromRestrictedReportHeader>;
type Params = Parameters<typeof buildNodeFromRestrictedReportHeader>;

type Case = Readonly<{
  params: Params;
  expected: Expected;
}>;

describe("buildNodeFromRestrictedReportHeader()", () => {
  test.each([
    {
      params: ["", 0],
      expected: {
        type: "text",
        elements: [
          {
            text: "",
            attributes: [
              { type: "color", value: "gray" },
              { type: "modifier", value: "underline" },
            ],
          },
          { text: " " },
          { text: "(0)", attributes: [{ type: "color", value: "gray" }] },
        ],
      },
    },
    {
      params: ["./a.ts", 1],
      expected: {
        type: "text",
        elements: [
          {
            text: "./a.ts",
            attributes: [
              { type: "color", value: "gray" },
              { type: "modifier", value: "underline" },
            ],
          },
          { text: " " },
          { text: "(1)", attributes: [{ type: "color", value: "gray" }] },
        ],
      },
    },
  ] satisfies Case[])(
    "should build nodes correctly %#",
    ({ params, expected }) => {
      const actual = buildNodeFromRestrictedReportHeader(...params);
      expect(actual).toEqual(expected);
    },
  );
});
