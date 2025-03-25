import { vi } from "vitest";
import type * as mod from "./owned-time-span";

type TimeSpan = (typeof mod)["ownedTimeSpan"];
type TimeEndFunction = ReturnType<TimeSpan>;

export const timeEndSpy = vi.fn<TimeEndFunction>();
const timeSpanSpy = vi.fn<TimeSpan>().mockReturnValue(timeEndSpy);

vi.mock("./owned-time-span", (): typeof mod => {
	return { ownedTimeSpan: timeSpanSpy };
});
