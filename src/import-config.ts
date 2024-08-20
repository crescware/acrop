import {
  array,
  boolean,
  custom,
  flatten,
  function_,
  type InferOutput,
  minLength,
  optional,
  pipe,
  safeParse,
  strictObject,
  string,
  union,
} from 'valibot';

const path$ = pipe(string(), minLength(1));
const glob$ = pipe(string(), minLength(1));
const regexp$ = custom((v) => v instanceof RegExp);

const scope$ = union([
  strictObject({
    scope: glob$,
    allowed: pipe(array(glob$), minLength(0)),
    disallowSiblingImportsUnlessAllow: optional(boolean()),
  }),
  strictObject({
    scope: glob$,
    matchPattern: regexp$,
    allowed: function_(),
    disallowSiblingImportsUnlessAllow: optional(boolean()),
  }),
]);

const config$ = strictObject({
  default: strictObject({
    root: path$,
    scopes: pipe(array(scope$), minLength(0)),
  }),
});

export async function importConfig(
  path: string,
): Promise<InferOutput<typeof config$>['default']> {
  const mod = (await import(path)) as unknown;
  const result = safeParse(config$, mod);

  if (!result.success) {
    console.log(flatten(result.issues));
    throw new Error();
  }

  return result.output.default;
}
