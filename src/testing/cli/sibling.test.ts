import { afterAll, beforeAll, describe, test } from "vitest";

import { createCliFixture, expectReport } from "./cli-fixture";

describe("CLI sibling boundaries", () => {
	const { buildCli, removeBuild, runCli } = createCliFixture();
	beforeAll(buildCli);
	afterAll(removeBuild);

	test.each([true, false])(
		"sibling: %s covers the same directory and descendants",
		(sibling) => {
			const rules = [
				{ sibling, name: "local" },
				sibling
					? { restricted: ["./src"], name: "external" }
					: { allowed: ["./src"] },
			];
			const result = runCli(
				JSON.stringify([{ scope: "./src/team/*", rules }]),
				{
					"src/team/a.ts":
						"import './b';\nimport './sub/c';\nimport '../team-other/d';",
				},
				["--unmatched-patterns", "error"],
			);
			expectReport(
				result,
				1,
				sibling
					? [
							"./src/team/a.ts (1)",
							"3:8 ./src/team-other/d external",
							"Files Checked 1 file (1 found, 0 unscoped)",
							"Restricted Imports 1 line",
						]
					: [
							"./src/team/a.ts (2)",
							"1:8 ./src/team/b local",
							"2:8 ./src/team/sub/c local",
							"Files Checked 1 file (1 found, 0 unscoped)",
							"Restricted Imports 2 lines",
						],
			);
		},
	);
});
