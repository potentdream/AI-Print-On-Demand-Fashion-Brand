"use client";

import { useActionState } from "react";
import { requestOtp, type FormState } from "@/lib/auth/actions";

export function PhoneForm({ demoMode }: { demoMode: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    requestOtp,
    {},
  );

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-4">
      <label htmlFor="phone" className="stamp-label text-xs text-muted">
        Your number, beta
      </label>
      <div className="flex items-stretch overflow-hidden rounded-ctl border border-line bg-surface focus-within:border-accent">
        <span className="flex items-center border-r border-line px-3.5 text-muted">
          +91
        </span>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="98765 43210"
          required
          className="min-h-12 w-full bg-transparent px-3.5 text-lg outline-none placeholder:text-faint"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-danger">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="min-h-12 rounded-ctl bg-accent px-6 text-lg font-semibold text-on-accent transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send OTP"}
      </button>

      {demoMode && (
        <p className="rounded-stamp bg-sunken px-3 py-2 text-xs text-muted">
          Demo mode is on: any valid-looking number works, and the OTP is{" "}
          <span className="font-semibold">000000</span>.
        </p>
      )}
    </form>
  );
}
