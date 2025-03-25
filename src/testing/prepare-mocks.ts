import { vi } from "vitest";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { timeEndSpy } from "../owned-time-span.mock";

type Return = Readonly<{
	read: (path: string) => string;
}>;

export function prepareMocks(dirname: string): Return {
	const argvSpy = vi.spyOn(globalThis.process, "argv", "get");
	argvSpy.mockReturnValue(["nodePath", "entryPath", "./acrop.config.ts"]);

	const cwdSpy = vi.spyOn(globalThis.process, "cwd");
	cwdSpy.mockReturnValue(dirname);

	timeEndSpy.mockReturnValue(1.23);

	return {
		read: (path: string): string => {
			return readFileSync(join(dirname, path), "utf8");
		},
	};
}
