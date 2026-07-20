import { describe, expect, it } from "vitest";
import { hashPhone, maskPhone, normalizeIndianPhone } from "./phone";

describe("normalizeIndianPhone", () => {
  it("accepts a bare 10-digit mobile", () => {
    expect(normalizeIndianPhone("9876543210")).toBe("+919876543210");
  });

  it("accepts +91 / 91 / 0 prefixes and stray formatting", () => {
    expect(normalizeIndianPhone("+91 98765 43210")).toBe("+919876543210");
    expect(normalizeIndianPhone("91-9876543210")).toBe("+919876543210");
    expect(normalizeIndianPhone("09876543210")).toBe("+919876543210");
    expect(normalizeIndianPhone("(91) 98765.43210")).toBe("+919876543210");
  });

  it("rejects landlines, short numbers, and garbage", () => {
    expect(normalizeIndianPhone("1234567890")).toBeNull(); // starts with 1
    expect(normalizeIndianPhone("98765")).toBeNull();
    expect(normalizeIndianPhone("98765432101")).toBeNull(); // 11 digits
    expect(normalizeIndianPhone("hello aunty")).toBeNull();
    expect(normalizeIndianPhone("")).toBeNull();
  });
});

describe("hashPhone", () => {
  it("is deterministic and never contains the number", () => {
    const h = hashPhone("+919876543210");
    expect(h).toBe(hashPhone("+919876543210"));
    expect(h).toMatch(/^[0-9a-f]{64}$/);
    expect(h).not.toContain("9876543210");
  });

  it("differs for different numbers", () => {
    expect(hashPhone("+919876543210")).not.toBe(hashPhone("+919876543211"));
  });
});

describe("maskPhone", () => {
  it("shows only the last four digits", () => {
    expect(maskPhone("+919876543210")).toBe("•••••• 3210");
  });
});
