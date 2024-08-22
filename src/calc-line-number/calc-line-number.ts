type LineNumber = Readonly<{
  line: number;
  column: number;
}>;

export function calcLineNumber(
  positions: readonly number[],
  start: number,
): LineNumber {
  const i = positions.findLastIndex((pos) => pos <= start);
  const column = start - (positions[i] ?? NaN) + 1;
  if (isNaN(column)) {
    throw new Error('invalid');
  }
  return { line: i + 1, column };
}
