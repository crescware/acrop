import {
  array,
  boolean,
  function_,
  minLength,
  optional,
  pipe,
  strictObject,
  string,
  union,
} from "valibot";

const path$ = pipe(string(), minLength(1));
const glob$ = pipe(string(), minLength(1));

const scope$ = strictObject({
  scope: glob$,
  allowed: union([pipe(array(glob$), minLength(0)), function_()]),
  disallowSiblingImportsUnlessAllow: optional(boolean()),
});

export const config$ = strictObject({
  default: strictObject({
    root: path$,
    scopes: pipe(array(scope$), minLength(0)),
  }),
});
