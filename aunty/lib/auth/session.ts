import { SignJWT, jwtVerify } from "jose";

/**
 * Session tokens, signed with HS256 via jose (works in both Node and edge
 * runtimes, so proxy.ts can verify too). Two token kinds:
 *  - session: a logged-in user (30 days)
 *  - pending: a phone that requested an OTP and awaits verification (10 min)
 *
 * NOTE (DECISIONS.md 2026-07-20): this thin layer exists so DEMO_MODE runs with
 * zero external services. When Supabase Auth is wired in Phase 1 it may replace
 * or back this — the call sites only know these functions.
 */

export const SESSION_COOKIE = "aunty_session";
export const PENDING_COOKIE = "aunty_pending";

const alg = "HS256";

function secret(): Uint8Array {
  const s = process.env.AUNTY_SESSION_SECRET;
  if (!s) {
    // DEMO_MODE deploys carry no real accounts, so they may run on the dev
    // secret. A real production deploy must fail hard instead.
    const demo = process.env.DEMO_MODE === "true";
    if (process.env.NODE_ENV === "production" && !demo) {
      throw new Error("AUNTY_SESSION_SECRET must be set in production");
    }
    return new TextEncoder().encode("aunty-dev-only-secret-never-in-prod");
  }
  return new TextEncoder().encode(s);
}

export async function signSession(userId: string, ttlSec = 30 * 24 * 3600) {
  return new SignJWT({ kind: "session" })
    .setProtectedHeader({ alg })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + ttlSec)
    .sign(secret());
}

export async function verifySession(
  token: string | undefined,
): Promise<{ userId: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.kind !== "session" || typeof payload.sub !== "string")
      return null;
    return { userId: payload.sub };
  } catch {
    return null;
  }
}

export async function signPending(phoneE164: string, ttlSec = 600) {
  return new SignJWT({ kind: "pending", phone: phoneE164 })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + ttlSec)
    .sign(secret());
}

export async function verifyPending(
  token: string | undefined,
): Promise<{ phone: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.kind !== "pending" || typeof payload.phone !== "string")
      return null;
    return { phone: payload.phone };
  } catch {
    return null;
  }
}
