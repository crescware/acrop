import { gray, underline } from "yoctocolors";

export function logHeader(path: string, count: number): void {
  const pathPart = gray(underline(path));
  const countPart = gray(`(${count})`);
  const header = [pathPart, countPart].join(" ");

  console.log(header);
}
