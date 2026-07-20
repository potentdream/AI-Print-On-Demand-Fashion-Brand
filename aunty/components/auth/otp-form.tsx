"use client";

import { useActionState } from "react";
import { verifyOtp, type FormState } from "@/lib/auth/actions";

export function OtpForm({ demoMode }: { demoMode: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    verifyOtp,
    {},
  );

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-4">
      <label htmlFor="code" className="stamp-label text-xs text-muted">
        The six digits
      </label>
      <input
        id="code"
        name="code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="\d{6}"
        maxLength={6}
        placeholder="••••••"
        required
        className="min-h-12 rounded-ctl border border-line bg-surface px-3.5 text-center text-2xl tracking-[0.5em] outline-none placeholder:text-faint focus:border-accent"
      />

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
        {pending ? "Checking…" : "Verify"}
      </button>

      {demoMode && (
        <p className="rounded-stamp bg-sunken px-3 py-2 text-xs text-muted">
          Demo mode: the code is <span className="font-semibold">000000</span>.
        </p>
      )}
    </form>
  );
}
