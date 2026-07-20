import { describe, expect, it } from "vitest";
import {
  signPending,
  signSession,
  verifyPending,
  verifySession,
} from "./session";

describe("session tokens", () => {
  it("round-trips a user id", async () => {
    const token = await signSession("user-123");
    expect(await verifySession(token)).toEqual({ userId: "user-123" });
  });

  it("rejects missing, garbage, and tampered tokens", async () => {
    expect(await verifySession(undefined)).toBeNull();
    expect(await verifySession("not-a-jwt")).toBeNull();
    const token = await signSession("user-123");
    expect(await verifySession(token.slice(0, -2) + "xx")).toBeNull();
  });

  it("rejects expired tokens", async () => {
    const token = await signSession("user-123", -10);
    expect(await verifySession(token)).toBeNull();
  });

  it("does not accept a pending token as a session (or vice versa)", async () => {
    const pending = await signPending("+919876543210");
    expect(await verifySession(pending)).toBeNull();
    const session = await signSession("user-123");
    expect(await verifyPending(session)).toBeNull();
  });
});

describe("pending tokens", () => {
  it("round-trips the phone", async () => {
    const token = await signPending("+919876543210");
    expect(await verifyPending(token)).toEqual({ phone: "+919876543210" });
  });

  it("expires", async () => {
    const token = await signPending("+919876543210", -10);
    expect(await verifyPending(token)).toBeNull();
  });
});
