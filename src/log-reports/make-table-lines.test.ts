import { describe, expect, test } from "vitest";
import { gray } from "yoctocolors";

import { TableNode } from "../log-tree/log-node";
import { makeTableLines } from "./make-table-lines";

type Case = Readonly<{
  node: TableNode;
  expected: readonly string[];
}>;

describe("makeTableLines()", () => {
  test.each([
    {
      node: {
        type: "table",
        rows: [
          [
            {
              type: "text",
              elements: [
                { text: "1:1", attributes: [{ type: "color", value: "gray" }] },
              ],
            },
            { type: "text", elements: [{ text: "./a.ts" }] },
          ],
        ],
        alignment: ["left", "left"],
      },
      expected: [`${gray("1:1")} ./a.ts `, ``],
    },
    {
      node: {
        type: "table",
        rows: [
          [
            {
              type: "text",
              elements: [
                { text: "1:1", attributes: [{ type: "color", value: "gray" }] },
              ],
            },
            { type: "text", elements: [{ text: "./a.ts" }] },
          ],
          [
            {
              type: "text",
              elements: [
                { text: "2:2", attributes: [{ type: "color", value: "gray" }] },
              ],
            },
            { type: "text", elements: [{ text: "./b.ts" }] },
          ],
        ],
        alignment: ["left", "left"],
      },
      expected: [`${gray("1:1")} ./a.ts `, `${gray("2:2")} ./b.ts `, ``],
    },
    {
      node: {
        type: "table",
        rows: [
          [
            {
              type: "text",
              elements: [
                { text: "1:1", attributes: [{ type: "color", value: "gray" }] },
              ],
            },
            { type: "text", elements: [{ text: "./a.ts" }] },
          ],
          [
            {
              type: "text",
              elements: [
                {
                  text: "12345:67890",
                  attributes: [{ type: "color", value: "gray" }],
                },
              ],
            },
            { type: "text", elements: [{ text: "./b.ts" }] },
          ],
        ],
        alignment: ["left", "left"],
      },
      expected: [
        `${gray("1:1")}         ./a.ts `,
        `${gray("12345:67890")} ./b.ts `,
        ``,
      ],
    },
  ] satisfies readonly Case[])(
    "should return logs correctly %#",
    ({ node, expected }) => {
      const actual = makeTableLines(node);
      expect(actual).toEqual(expected.join("\n"));
    },
  );
});
