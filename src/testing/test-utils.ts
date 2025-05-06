import { randomUUID } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import type { InferOutput } from "valibot";
import { afterEach, beforeEach, vi } from "vitest";

import { importConfig } from "../import-config";
import type { config$ } from "../import-config/config";
import { outputFromTree } from "../log-reports";

type FileSpec = Readonly<{
	path: string;
	content: string;
}>;

type SetupOptions = Readonly<{
	configFileName: string;
	config: InferOutput<typeof config$>["default"];
	files: readonly FileSpec[];
}>;

const noop = () => {
	/* noop */
};

export function setupMainTest({ configFileName, config, files }: SetupOptions) {
	const testDirRoot = resolve(tmpdir(), `vitest-acrop-test-${randomUUID()}`);
	const configFilePathAbs = resolve(testDirRoot, configFileName);

	let originalArgv: string[];

	beforeEach(async () => {
		vi.restoreAllMocks();
		originalArgv = [...process.argv];

		vi.spyOn(process, "cwd").mockReturnValue(testDirRoot);
		vi.mocked(importConfig).mockResolvedValue(config);

		(() => {
			const mockClear = vi.mocked(outputFromTree).mockClear;
			(mockClear ?? noop)();
		})();

		await mkdir(testDirRoot, { recursive: true });
		for (const { path, content } of files) {
			const abs = resolve(testDirRoot, path);
			await mkdir(dirname(abs), { recursive: true });
			await writeFile(abs, content);
		}

		process.argv = ["/usr/bin/node", "/app/dist/index.mjs", configFileName];
	});

	afterEach(async () => {
		process.argv = originalArgv;
		await rm(testDirRoot, { recursive: true, force: true });
	});

	return { testDirRoot, configFilePathAbs };
}
