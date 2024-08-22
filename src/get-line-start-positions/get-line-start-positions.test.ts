import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, test } from 'vitest';

import { getLineStartPositions } from './get-line-start-positions';

function read(path: string): string {
  return readFileSync(resolve(import.meta.dirname, path), 'utf8');
}

describe('getLineStartPositions()', () => {
  test('calculates with CRLF', () => {
    const code = read('./parse-example/crlf.txt');
    const actual = getLineStartPositions(code);
    expect(actual).toEqual([1, 23, 45, 67, 89]);
  });

  test('calculates with LF', () => {
    const code = read('./parse-example/lf.txt');
    const actual = getLineStartPositions(code);
    expect(actual).toEqual([1, 22, 43, 64, 85]);
  });
});
