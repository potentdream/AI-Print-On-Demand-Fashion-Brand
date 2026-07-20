/**
 * In-memory sliding-window rate limiter. Per-instance only — good enough for
 * DEMO_MODE and a single-region deploy. Replace with a durable store (Postgres
 * or Upstash) before real traffic; tracked in PROGRESS.md Phase 4.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

export function takeToken(
  key: string,
  opts: { max: number; windowMs: number },
  now: number = Date.now(),
): { ok: boolean; retryAfterMs: number } {
  const w = windows.get(key);
  if (!w || now >= w.resetAt) {
    windows.set(key, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, retryAfterMs: 0 };
  }
  if (w.count < opts.max) {
    w.count += 1;
    return { ok: true, retryAfterMs: 0 };
  }
  return { ok: false, retryAfterMs: w.resetAt - now };
}

export function resetRateLimits() {
  windows.clear();
}
