import { createHash } from "node:crypto";

/**
 * Normalize an Indian mobile number to E.164 (+91XXXXXXXXXX).
 * Accepts: bare 10-digit (starting 6–9), or the same with +91 / 91 / 0 prefix,
 * with any spaces, dashes, dots, or parentheses sprinkled in.
 * Returns null for anything else — launch is India-only (SPEC 2.2).
 */
export function normalizeIndianPhone(input: string): string | null {
  const digits = input.replace(/[\s\-.()]/g, "");
  const m = digits.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  return m ? `+91${m[1]}` : null;
}

/**
 * One-way hash for storing/matching phone numbers (SPEC 5.3: phone hash, never
 * the raw number). Salted so a leaked table can't be joined against a phone list.
 */
export function hashPhone(phoneE164: string): string {
  const salt = process.env.AUNTY_PHONE_SALT || "aunty-dev-phone-salt";
  return createHash("sha256").update(`${salt}:${phoneE164}`).digest("hex");
}

/** "+919876543210" → "•••••• 3210" — the only form the UI ever shows. */
export function maskPhone(phoneE164: string): string {
  return `•••••• ${phoneE164.slice(-4)}`;
}
