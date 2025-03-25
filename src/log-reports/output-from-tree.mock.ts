import { vi } from "vitest";

import type * as outputFromTreeMod from "./output-from-tree";

export const outputFromTreeSpy =
	vi.fn<(typeof outputFromTreeMod)["outputFromTree"]>();

vi.mock("./output-from-tree", (): typeof outputFromTreeMod => {
	return { outputFromTree: outputFromTreeSpy };
});
