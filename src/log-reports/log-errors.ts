import { red } from "yoctocolors";

export type ErrorReport = Readonly<{
  path: string;
  errors: readonly string[];
}>;

export function logErrors(errorsRef: readonly ErrorReport[]): void {
  errorsRef.forEach((v) => {
    console.log(red(v.path));
    console.log("");
    v.errors.forEach((line) => console.log(line));
  });
}
