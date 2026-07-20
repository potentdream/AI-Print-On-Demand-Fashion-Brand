"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { hashPhone, maskPhone, normalizeIndianPhone } from "@/lib/phone";
import { takeToken } from "@/lib/rate-limit";
import { getOtpProvider } from "./otp";
import {
  PENDING_COOKIE,
  SESSION_COOKIE,
  signPending,
  signSession,
  verifyPending,
} from "./session";

export type FormState = { error?: string };

const cookieBase = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
} as const;

export async function requestOtp(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = String(formData.get("phone") ?? "");
  const phone = normalizeIndianPhone(raw);
  if (!phone) {
    return {
      error: "That number doesn't look right, beta. Ten digits, Indian mobile.",
    };
  }

  const limit = takeToken(`otp-send:${hashPhone(phone)}`, {
    max: 5,
    windowMs: 15 * 60_000,
  });
  if (!limit.ok) {
    const mins = Math.ceil(limit.retryAfterMs / 60_000);
    return {
      error: `Enough, beta. Aunty already sent it. Try again in ${mins} min.`,
    };
  }

  const sent = await getOtpProvider().send(phone);
  if (!sent.ok) {
    return { error: sent.reason ?? "The SMS didn't go through. Try again." };
  }

  const jar = await cookies();
  jar.set(PENDING_COOKIE, await signPending(phone), {
    ...cookieBase,
    maxAge: 600,
  });
  redirect("/login/verify");
}

export async function verifyOtp(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const jar = await cookies();
  const pending = await verifyPending(jar.get(PENDING_COOKIE)?.value);
  if (!pending) {
    // Pending token expired (10 min) — restart cleanly.
    redirect("/login");
  }

  const code = String(formData.get("code") ?? "").trim();
  if (!/^\d{6}$/.test(code)) {
    return { error: "Six digits, beta. It's written right there." };
  }

  const phoneHash = hashPhone(pending.phone);
  const limit = takeToken(`otp-verify:${phoneHash}`, {
    max: 8,
    windowMs: 15 * 60_000,
  });
  if (!limit.ok) {
    return { error: "Too many tries. Take a breath; ask for a fresh code." };
  }

  const valid = await getOtpProvider().verify(pending.phone, code);
  if (!valid) {
    return { error: "Wrong code, beta. Aunty saw that. Look again." };
  }

  const db = getDb();
  const user =
    (await db.findUserByPhoneHash(phoneHash)) ??
    (await db.createUser({ phoneHash, phoneMasked: maskPhone(pending.phone) }));

  jar.delete(PENDING_COOKIE);
  jar.set(SESSION_COOKIE, await signSession(user.id), {
    ...cookieBase,
    maxAge: 30 * 24 * 3600,
  });
  redirect("/home");
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/");
}
