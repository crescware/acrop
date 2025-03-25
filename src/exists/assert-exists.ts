import { exists } from "./exists";

export function assertExists<T>(
	v: T | null | undefined,
	target = "",
): asserts v is NonNullable<T> {
	if (!exists(v)) {
		throw new Error(`${target} should be specified`.trim());
	}
}
