import { detectNewlineGraceful } from "detect-newline";

export function getLineStartPositions(code: string): readonly number[] {
  const newline = detectNewlineGraceful(code);

  const positions = [] as number[];

  // First line always starts at 1
  positions.push(1);

  for (let i = 0; i < code.length; i++) {
    if (newline === "\r\n" && code[i] === "\r" && code[i + 1] === "\n") {
      positions.push(i + 3);
      i++; // Because of CRLF, advance i by one more
      continue;
    }
    if (newline === "\n" && code[i] === "\n") {
      positions.push(i + 2);
      continue;
    }
  }

  return positions;
}
