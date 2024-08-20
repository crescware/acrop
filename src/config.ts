import {
  array,
  boolean,
  custom,
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

export const config$ = strictObject({
  default: strictObject({
    root: path$,
    scopes: pipe(array(scope$), minLength(0)),
  }),
});
