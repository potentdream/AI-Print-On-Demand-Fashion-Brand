import { isDemoMode } from "@/lib/env";

/**
 * OTP delivery seam. DEMO_MODE ships a fixed-code provider so the whole app
 * runs with zero external services. The real provider is MSG91 (chosen for
 * Indian DLT-compliant SMS — see DECISIONS.md 2026-07-20); it gets wired in
 * Phase 1 when credentials exist.
 */

export const DEMO_OTP_CODE = "000000";

export interface OtpProvider {
  /** Send a code to the phone. */
  send(phoneE164: string): Promise<{ ok: boolean; reason?: string }>;
  /** Check a user-entered code. */
  verify(phoneE164: string, code: string): Promise<boolean>;
}

class DemoOtpProvider implements OtpProvider {
  async send() {
    return { ok: true };
  }
  async verify(_phone: string, code: string) {
    return code === DEMO_OTP_CODE;
  }
}

class UnconfiguredOtpProvider implements OtpProvider {
  async send() {
    return {
      ok: false,
      reason:
        "No OTP provider configured. Set DEMO_MODE=true for local dev, or configure MSG91 (Phase 1).",
    };
  }
  async verify() {
    return false;
  }
}

export function getOtpProvider(): OtpProvider {
  if (isDemoMode()) return new DemoOtpProvider();
  // Phase 1: return new Msg91Provider(process.env.MSG91_AUTH_KEY!) when configured.
  return new UnconfiguredOtpProvider();
}
