import {
	array,
	boolean,
	function_,
	minLength,
	pipe,
	strictObject,
	string,
	union,
} from "valibot";

const path$ = pipe(string(), minLength(1));
const glob$ = pipe(string(), minLength(1));

const rule$ = union([
	strictObject({
		allowed: union([pipe(array(glob$), minLength(0)), function_()]),
	}),
	strictObject({
		restricted: union([pipe(array(glob$), minLength(0)), function_()]),
	}),
	strictObject({
		sibling: boolean(),
	}),
]);

const scope$ = strictObject({
	scope: glob$,
	rules: array(rule$),
});

export const config$ = strictObject({
	default: strictObject({
		root: path$,
		scopes: pipe(array(scope$), minLength(0)),
	}),
});
