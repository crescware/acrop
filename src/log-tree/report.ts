import { buildNodeFromResults } from "./build-node-from-results";

export type Report = Readonly<{
  tsPath: string;
  result: Parameters<typeof buildNodeFromResults>[0];
}>;
