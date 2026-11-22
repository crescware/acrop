import { calcLineNumber } from "../calc-line-number";
import { getLineStartPositions } from "../get-line-start-positions";

type Location = ReturnType<typeof calcLineNumber>;

/**
 * Returns a function that turns an offset in `code` into a line and a column.
 * Scanning the file for its line starts waits until the first call, because
 * only a restricted import needs a position and most files have none.
 */
export function makeLocator(code: string): (offset: number) => Location {
	let positions: ReturnType<typeof getLineStartPositions> | null = null;

	return (offset) => {
		positions ??= getLineStartPositions(code);
		return calcLineNumber(positions, offset + 1);
	};
}
