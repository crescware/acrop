export type Result = Readonly<{
  path: Readonly<{
    relative: string;
  }>;
  line: number;
  column: number;
  isAllowed: boolean;
}>;
