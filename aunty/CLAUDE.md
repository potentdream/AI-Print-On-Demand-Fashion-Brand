# Aunty — engineering guide

AI-matchmaker dating app for India. Full product spec: `SPEC.md`. Work state:
`PROGRESS.md` (do the topmost unchecked item). Choices log: `DECISIONS.md`.

**Session protocol:** read this file, `PROGRESS.md`, and the last ~10 entries of
`DECISIONS.md` before writing code. Commit small + conventional
(`feat:`/`fix:`/`design:`/`chore:`), push at session end, never leave the repo
broken.

⚠️ Next.js 16 differs from training data — see `AGENTS.md`; docs live in
`node_modules/next/dist/docs/`. Notables: `proxy.ts` replaces `middleware.ts`;
`cookies()` is async.

## Run

```bash
cd aunty
pnpm install
cp .env.example .env.local   # DEMO_MODE=true is already set — nothing else needed
pnpm dev                     # http://localhost:3000, OTP is 000000
```

## Commands

| Command          | What                                      |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | dev server                                |
| `pnpm build`     | production build                          |
| `pnpm lint`      | eslint                                    |
| `pnpm typecheck` | tsc --noEmit                              |
| `pnpm test`      | vitest (unit; astro goldens from Phase 2) |
| `pnpm e2e`       | Playwright smoke (needs `pnpm build`)     |
| `pnpm format`    | prettier --write                          |
| `pnpm icons`     | regenerate PWA icons from the Aunty mark  |
| `pnpm fonts`     | re-vendor woff2 fonts (rarely needed)     |

CI (`.github/workflows/aunty-ci.yml` at repo root) runs lint + typecheck +
test + build on every push touching `aunty/`. In the remote dev environment,
run e2e as `PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium pnpm e2e`
(pre-installed browser; don't download).

## Stack

Next.js 16 (App Router) + TS strict + Tailwind v4 · Supabase planned for
data/auth/realtime/storage (RLS everywhere; schema drafts in
`supabase/migrations/`) · jose-signed cookie sessions with a demo store while
`DEMO_MODE=true` · vitest · pnpm · PWA (manifest + `public/sw.js`).

Layout: `app/` routes · `components/` UI · `lib/auth` sessions/OTP ·
`lib/db` data seam (demo JSON ↔ Supabase later) · `lib/ai` `lib/astro`
`lib/match` arrive in Phases 1–3 · `scripts/` one-shot generators ·
`supabase/migrations/` SQL.

## Env vars (all documented in `.env.example`)

`DEMO_MODE` (true = zero external services; OTP 000000) ·
`AUNTY_SESSION_SECRET` + `AUNTY_PHONE_SALT` (required in prod; salt is
set-once) · `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` /
`SUPABASE_SERVICE_ROLE_KEY` (Phase 1) · `ANTHROPIC_API_KEY` +
`AI_DAILY_COST_CAP_INR` (Phase 1+) · `MSG91_AUTH_KEY` (Phase 1) · Razorpay /
PostHog / Sentry (Phases 6–7).

## Conventions

- Privacy posture (SPEC 5.10): raw phone numbers are never stored (salted
  hash plus display mask only); birth data / community / inter-faith fields
  are sensitive — encrypted at rest, never in analytics events, never in logs.
- Pure logic (`lib/astro`, `lib/match`, phone/session helpers) stays free of
  IO so it's unit-testable; IO lives at the edges (`lib/db`, actions).
- Every AI-visible line obeys SPEC 3.3 roast rules; constitution + output
  moderation land in `lib/ai` (Phase 1).
- Server actions re-check auth themselves; `proxy.ts` is only an optimistic
  redirect layer.
- Breach-readiness (DPDP posture): if a data incident is suspected — rotate
  `AUNTY_SESSION_SECRET` (kills all sessions), snapshot DB + logs, write a
  user-facing note in plain language. A lawyer review is a pre-launch task.

## Design tokens ("The Matchmaking Bureau" — see DECISIONS.md)

- **Palette:** stamp-pad ink `#1b2153` on cool paper `#f6f5f1`; rani pink
  `#d6156c` for actions; turmeric `#e9a13b` decorative (`#b06f0e` for text);
  mehndi green `#33693f` success; signage red `#b5301f` danger. Dark mode =
  ink-navy surfaces (`#0d102e`/`#141838`), brighter rani `#f03d8c`. All defined
  as CSS vars in `app/globals.css`; use only semantic Tailwind names
  (`bg-accent`, `text-muted`, `border-line`, …).
- **Type:** display = Martel (newspaper serif, native Devanagari);
  UI = Anek Latin/Devanagari/Malayalam (variable, width axis). Self-hosted
  woff2 in `public/fonts` — no runtime Google Fonts.
- **Motifs:** rubber-stamp chips (`.stamp` + `.stamp-label`), the verdict card
  is THE signature object (Phase 1). One orchestrated animation: the stamp
  thunk (`--ease-thunk`); everything else quiet. Radii: controls 12px, cards
  18px, stamps 6px.
- **Mechanics:** mobile-first, bottom nav (Aunty/Intros/Chats/You), 44px+
  targets, dark mode + reduced-motion respected, microcopy in Aunty's voice
  but controls say exactly what they do.

## Deploy (human step, once)

Vercel → Import `potentdream/AI-Print-On-Demand-Fashion-Brand` → Root
Directory: `aunty` → env vars: `DEMO_MODE=true` (until Supabase), generated
`AUNTY_SESSION_SECRET`, `AUNTY_PHONE_SALT` → Deploy. Then check
`/api/health`.
