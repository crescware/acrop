import { describe, expect, test } from 'vitest';

import { calcLineNumber } from './calc-line-number';

describe('calcLineNumber()', () => {
  test.each([
    {
      positions: [1, 21, 41, 61],
      position: 1,
      expected: { line: 1, column: 1 },
    },
    {
      positions: [1, 21, 41, 61],
      position: 2,
      expected: { line: 1, column: 2 },
    },
    {
      positions: [1, 21, 41, 61],
      position: 20,
      expected: { line: 1, column: 20 },
    },
    {
      positions: [1, 21, 41, 61],
      position: 21,
      expected: { line: 2, column: 1 },
    },
    {
      positions: [1, 21, 41, 61],
      position: 22,
      expected: { line: 2, column: 2 },
    },
    {
      positions: [1, 21, 41, 61],
      position: 41,
      expected: { line: 3, column: 1 },
    },
  ] as const)('$expected', ({ positions, position, expected }) => {
    expect(calcLineNumber(positions, position)).toEqual(expected);
  });
});
