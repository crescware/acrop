export function exists<T>(v: T | null | undefined): v is T {
	return typeof v !== "undefined" && v !== null;
}
