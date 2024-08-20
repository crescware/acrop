import { type File, isImportDeclaration, type Node } from "@babel/types";

type ImportInfo = Readonly<{
  path: string;
  line: number;
  column: number;
}>;

export function findImportPaths(file: File): readonly ImportInfo[] {
  const importInfos: ImportInfo[] = [];

  function traverse(node: Node): void {
    if (isImportDeclaration(node)) {
      importInfos.push({
        path: node.source.value,
        line: node.source.loc?.start?.line ?? NaN,
        column: (node.source.loc?.start?.column ?? NaN) + 1,
      });
      return;
    }

    if ("body" in node && Array.isArray(node.body)) {
      node.body.forEach((v) => traverse(v));
      return;
    }

    // noop
  }

  traverse(file.program);

  return importInfos as readonly ImportInfo[];
}
