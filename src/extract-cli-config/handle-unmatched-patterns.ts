import type { UnmatchedPatternsFlags } from "./unmatched-patterns-flags";

const severity = ["off", "warn", "error"] as const;
type Severity = (typeof severity)[number];

const isSeverity = (v: string): v is Severity => {
	return (severity as ReadonlyArray<string>).includes(v);
};

export function handleUnmatchedPatterns(
	v: string | undefined,
): UnmatchedPatternsFlags {
	if (typeof v === "undefined") {
		throw new Error(
			"Error: Missing value for --unmatched-patterns. Expected 'off', 'warn', or 'error'.",
		);
	}

	if (!isSeverity(v)) {
		throw new Error(
			`Error: Invalid value for --unmatched-patterns. Expected ${severity.join(" or ")}. Got: ${v}`,
		);
	}

	switch (v) {
		case "off":
			return { needsCheck: false, shouldFail: false };

		case "warn":
			return { needsCheck: true, shouldFail: false };

		case "error":
			return { needsCheck: true, shouldFail: true };

		default:
			throw new Error(
				// biome-ignore lint/suspicious/noExplicitAny:
				`Internal error: Unexpected severity value: ${v as any}`,
			);
	}
}
