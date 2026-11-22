import { dirname, posix, relative, resolve, sep } from "node:path";

/**
 * Returns a function that turns a specifier imported by `importer` into the
 * path that rules are matched against: relative to `root` and written `./…`.
 *
 * The answer is always the one given by resolving the specifier against the
 * importer's directory and taking that relative to `root`. Doing so walks the
 * whole absolute path twice for every import, so the usual case is answered
 * by joining the specifier onto the importer's directory relative to `root`.
 */
export function makeImportResolver(
	root: string,
	importer: string,
): (specifier: string) => string {
	const directory = dirname(importer);
	const directoryFromRoot = relative(root, directory);
	// Joining as text is only right for "/" separators and inside `root`.
	const canJoin = sep === "/" && !directoryFromRoot.startsWith("..");

	return (specifier) => {
		if (canJoin && !specifier.startsWith("/")) {
			const joined = posix.normalize(
				directoryFromRoot === ""
					? specifier
					: `${directoryFromRoot}/${specifier}`,
			);
			// A path that leaves `root` may come back into it another way.
			if (!joined.startsWith("..")) {
				return `./${asResolved(joined)}`;
			}
		}

		return `./${relative(root, resolve(directory, specifier))}`;
	};
}

// `normalize` keeps a trailing slash and writes the empty path as ".", while
// `resolve` and `relative` do neither.
function asResolved(normalized: string): string {
	const trimmed = normalized.endsWith("/")
		? normalized.slice(0, -1)
		: normalized;
	return trimmed === "." ? "" : trimmed;
}
