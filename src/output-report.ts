import { underline } from 'yoctocolors';

type Result = Readonly<{
  path: string;
  line: number;
  column: number;
  isAllowed: boolean;
}>;

export function outputReport(
  targetPath: string,
  results: readonly Result[],
): void {
  if (results.length === 0) {
    return;
  }

  console.log(underline(targetPath));
  results.forEach((v) => {
    console.log([[v.line, v.column].join(':'), v.path].join(' '));
  });
  console.log('');
}
