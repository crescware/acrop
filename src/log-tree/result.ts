export type Result = Readonly<{
  path: string;
  line: number;
  column: number;
  isAllowed: boolean;
}>;
