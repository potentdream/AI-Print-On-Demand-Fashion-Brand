"use client";

import { useActionState, useState } from "react";
import { joinWaitlist, type WaitlistFormState } from "@/lib/waitlist/actions";
import { LAUNCH_CITIES, OTHER_CITY } from "@/lib/waitlist/validate";

export function WaitlistForm() {
  const [state, action, pending] = useActionState<WaitlistFormState, FormData>(
    joinWaitlist,
    { status: "idle" },
  );
  const [city, setCity] = useState<string>(LAUNCH_CITIES[0]);

  if (state.status === "joined" || state.status === "already") {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
        <span className="stamp stamp-label text-sm text-ok">
          {state.status === "joined" ? "In the queue" : "Already in the queue"}
        </span>
        <p className="text-sm leading-relaxed text-muted">
          {state.status === "joined"
            ? `Noted, beta. The moment Aunty opens ${state.city}, your phone rings first.`
            : `Patience, beta. You're already on the ${state.city} list — Aunty forgets nothing.`}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-4">
      <label htmlFor="wl-city" className="stamp-label text-xs text-muted">
        Your city
      </label>
      <div className="relative">
        <select
          id="wl-city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="min-h-12 w-full appearance-none rounded-ctl border border-line bg-surface px-3.5 pr-10 text-lg outline-none focus:border-accent"
        >
          {LAUNCH_CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value={OTHER_CITY}>{OTHER_CITY}</option>
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        >
          ▾
        </span>
      </div>

      {city === OTHER_CITY && (
        <input
          name="otherCity"
          type="text"
          maxLength={40}
          placeholder="Tell Aunty where"
          aria-label="Your city name"
          className="min-h-12 rounded-ctl border border-line bg-surface px-3.5 text-lg outline-none placeholder:text-faint focus:border-accent"
        />
      )}

      <label htmlFor="wl-phone" className="stamp-label text-xs text-muted">
        Your number
      </label>
      <div className="flex items-stretch overflow-hidden rounded-ctl border border-line bg-surface focus-within:border-accent">
        <span className="flex items-center border-r border-line px-3.5 text-muted">
          +91
        </span>
        <input
          id="wl-phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="98765 43210"
          required
          className="min-h-12 w-full bg-transparent px-3.5 text-lg outline-none placeholder:text-faint"
        />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-danger">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="min-h-12 rounded-ctl bg-accent px-6 text-lg font-semibold text-on-accent transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {pending ? "Noting it down…" : "Hold my spot"}
      </button>

      <p className="text-xs leading-relaxed text-faint">
        Number stored as a one-way hash, used once — to tell you Aunty is in
        town. No spam; she has standards.
      </p>
    </form>
  );
}
