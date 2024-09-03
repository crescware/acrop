import { buildNodeFromResults } from "./build-node-from-results";

export type Report = Readonly<{
  tsPath: {
    relative: string;
    absolute: string;
  };
  result: Parameters<typeof buildNodeFromResults>[0];
}>;
