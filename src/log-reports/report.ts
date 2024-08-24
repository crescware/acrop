import { buildNodeFromResults } from "../log-tree/build-node-from-results";

export type Report = Readonly<{
  tsPath: string;
  result: Parameters<typeof buildNodeFromResults>[0];
}>;
