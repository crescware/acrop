import { vi } from "vitest";
import type * as mod from "./owned-time-span";

type TimeSpan = (typeof mod)["ownedTimeSpan"];
type TimeEndFunction = ReturnType<TimeSpan>;

export const timeEndMock = vi.fn<TimeEndFunction>();
const timeSpanMock = vi.fn<TimeSpan>().mockReturnValue(timeEndMock);

vi.mock("./owned-time-span", (): typeof mod => {
  return { ownedTimeSpan: timeSpanMock };
});
