import { normalizeIndianPhone } from "@/lib/phone";

/**
 * Launch is city-scoped (SPEC 4.2); the waitlist measures where demand is.
 * Order = current gut ranking of launch candidates, not alphabet.
 */
export const LAUNCH_CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Indore",
  "Kochi",
] as const;

export const OTHER_CITY = "Somewhere else";

export type WaitlistInput =
  { ok: true; city: string; phone: string } | { ok: false; error: string };

export function validateWaitlistInput(raw: {
  city: string;
  otherCity: string;
  phone: string;
}): WaitlistInput {
  const phone = normalizeIndianPhone(raw.phone);
  if (!phone) {
    return {
      ok: false,
      error: "That number doesn't look right, beta. Ten digits, Indian mobile.",
    };
  }

  let city = raw.city.trim();
  if (city === OTHER_CITY) {
    city = raw.otherCity.trim().slice(0, 40);
    if (city.length < 2) {
      return { ok: false, error: "Which city, beta? Aunty needs a name." };
    }
  } else if (!(LAUNCH_CITIES as readonly string[]).includes(city)) {
    return { ok: false, error: "Pick a city from the list, beta." };
  }

  return { ok: true, city, phone };
}
