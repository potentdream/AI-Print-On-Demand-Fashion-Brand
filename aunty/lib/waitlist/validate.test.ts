import { describe, expect, it } from "vitest";
import { OTHER_CITY, validateWaitlistInput } from "./validate";

describe("validateWaitlistInput", () => {
  it("accepts a listed city and a valid phone", () => {
    const r = validateWaitlistInput({
      city: "Mumbai",
      otherCity: "",
      phone: "98765 43210",
    });
    expect(r).toEqual({ ok: true, city: "Mumbai", phone: "+919876543210" });
  });

  it("uses the free-text city when 'Somewhere else' is chosen", () => {
    const r = validateWaitlistInput({
      city: OTHER_CITY,
      otherCity: "  Nagpur  ",
      phone: "9876543210",
    });
    expect(r).toEqual({ ok: true, city: "Nagpur", phone: "+919876543210" });
  });

  it("rejects a missing free-text city", () => {
    const r = validateWaitlistInput({
      city: OTHER_CITY,
      otherCity: " ",
      phone: "9876543210",
    });
    expect(r.ok).toBe(false);
  });

  it("rejects unknown select values and bad phones", () => {
    expect(
      validateWaitlistInput({
        city: "Atlantis",
        otherCity: "",
        phone: "9876543210",
      }).ok,
    ).toBe(false);
    expect(
      validateWaitlistInput({ city: "Mumbai", otherCity: "", phone: "12345" })
        .ok,
    ).toBe(false);
  });

  it("caps free-text city length at 40 chars", () => {
    const r = validateWaitlistInput({
      city: OTHER_CITY,
      otherCity: "x".repeat(80),
      phone: "9876543210",
    });
    expect(r.ok && r.city.length === 40).toBe(true);
  });
});
