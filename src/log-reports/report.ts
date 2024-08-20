import { logReport } from "./log-report";

export type Report = Readonly<{
  tsPath: string;
  result: Parameters<typeof logReport>[1];
}>;
