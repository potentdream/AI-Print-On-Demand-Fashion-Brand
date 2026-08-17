"use server";

import { getDb } from "@/lib/db";
import { hashPhone, maskPhone } from "@/lib/phone";
import { takeToken } from "@/lib/rate-limit";
import { validateWaitlistInput } from "./validate";

export type WaitlistFormState =
  | { status: "idle" }
  | { status: "error"; error: string }
  | { status: "joined"; city: string }
  | { status: "already"; city: string };

export async function joinWaitlist(
  _prev: WaitlistFormState,
  formData: FormData,
): Promise<WaitlistFormState> {
  const input = validateWaitlistInput({
    city: String(formData.get("city") ?? ""),
    otherCity: String(formData.get("otherCity") ?? ""),
    phone: String(formData.get("phone") ?? ""),
  });
  if (!input.ok) return { status: "error", error: input.error };

  const phoneHash = hashPhone(input.phone);
  const limit = takeToken(`waitlist:${phoneHash}`, {
    max: 4,
    windowMs: 15 * 60_000,
  });
  if (!limit.ok) {
    return {
      status: "error",
      error: "Aunty heard you the first time, beta. Try again in a bit.",
    };
  }

  try {
    const db = getDb();
    const existing = await db.findWaitlistByPhoneHash(phoneHash);
    if (existing) return { status: "already", city: existing.city };

    const entry = await db.addWaitlistEntry({
      city: input.city,
      phoneHash,
      phoneMasked: maskPhone(input.phone),
    });
    return { status: "joined", city: entry.city };
  } catch {
    return {
      status: "error",
      error: "Aunty's ledger is jammed right now. Try again in a minute.",
    };
  }
}
