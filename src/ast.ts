import {
  array,
  InferOutput,
  integer,
  literal,
  looseObject,
  minValue,
  number,
  object,
  parse,
  pipe,
  safeParse,
  string,
  union,
} from "valibot";

const positionIndex$ = pipe(number(), integer(), minValue(0));

const positionEntries = {
  start: positionIndex$,
  end: positionIndex$,
} satisfies Parameters<typeof object>[0];

const stringLiteral$ = object({
  ...positionEntries,
  type: literal("StringLiteral"),
  value: string(),
});

const importDeclaration$ = object({
  ...positionEntries,
  type: literal("ImportDeclaration"),
  source: stringLiteral$,
});

export function isImportDeclaration(
  v: unknown,
): v is InferOutput<typeof importDeclaration$> {
  return safeParse(importDeclaration$, v).success;
}

export const node$ = union([
  importDeclaration$,
  looseObject({
    type: string(),
  }),
]);

export const ast$ = object({
  ...positionEntries,
  type: literal("Program"),
  body: array(node$),
});
