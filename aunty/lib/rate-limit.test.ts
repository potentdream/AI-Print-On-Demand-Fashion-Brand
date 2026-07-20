import { beforeEach, describe, expect, it } from "vitest";
import { resetRateLimits, takeToken } from "./rate-limit";

const opts = { max: 3, windowMs: 60_000 };

describe("takeToken", () => {
  beforeEach(() => resetRateLimits());

  it("allows up to max within the window, then blocks", () => {
    const t0 = 1_000_000;
    expect(takeToken("k", opts, t0).ok).toBe(true);
    expect(takeToken("k", opts, t0 + 1).ok).toBe(true);
    expect(takeToken("k", opts, t0 + 2).ok).toBe(true);
    const blocked = takeToken("k", opts, t0 + 3);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });

  it("resets after the window passes", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 3; i++) takeToken("k", opts, t0);
    expect(takeToken("k", opts, t0 + 60_001).ok).toBe(true);
  });

  it("tracks keys independently", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 3; i++) takeToken("a", opts, t0);
    expect(takeToken("a", opts, t0).ok).toBe(false);
    expect(takeToken("b", opts, t0).ok).toBe(true);
  });
});
