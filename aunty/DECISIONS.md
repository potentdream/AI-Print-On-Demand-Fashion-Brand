# Decisions (ADR-lite)

Newest first. 3–5 lines each: what, why, what was rejected.

## 2026-08-17 · The verdict card is a bureau document

Anatomy locked: double rule border, letterhead ("The Matchmaking Bureau" +
case number), the ruling in Martel display, subject line, "From the desk of
Aunty" footer with her mark, and an inked stamp breaking the top-right frame.
Tone lives in the stamp colour (gold roast / rani caution / mehndi approval),
not in the card. Same anatomy will serve intro verdicts and share cards, so
`VerdictCard` takes `caseNo/subject/line/stamp/stampTone` and nothing about
layout. Rejected: score-first dashboard cards (numbers before voice).

## 2026-08-17 · Landing page: proof over persuasion

Structure: hero → "How the Bureau works" (3 steps) → Recent rulings (3 sample
cards) → House rules → waitlist → footer. The house-rules block states the
non-negotiables as promises in her voice (women-first, faith is a preference,
encryption, 18+) because these are the actual differentiators vs Tinder and
Shaadi. Sample roasts target bios and behaviour only, per SPEC 3.3 — each is
publishable on Instagram unedited. Rejected: fake testimonials, fake counts.

## 2026-08-17 · Waitlist stores hashed phones, no accounts

Landing waitlist writes `{city, phone_hash, phone_masked}` only — same salted
hash as auth, so a waitlister is not an account and cannot be joined back to a
number. Duplicate submits return "already in the queue" rather than erroring.
12 launch cities plus free text (capped 40 chars) to measure real demand.
RLS-on table with zero client policies: server-only writes. Rejected: email
capture (Indian users respond to SMS/WhatsApp), and storing raw numbers.

## 2026-07-20 · Aunty lives in `aunty/` inside this repo

The session is scoped to `potentdream/AI-Print-On-Demand-Fashion-Brand`, which
already contains an unrelated POD-brand project at root. Chose a self-contained
`aunty/` subdirectory over deleting/mixing root files. If the human later wants
a dedicated repo, the directory lifts out cleanly (`git filter-repo` or copy).
Rejected: replacing root content (destroys existing work without permission).

## 2026-07-20 · Stack pins: Next.js 16.2 / React 19.2 / Tailwind v4 / vitest

Took what `create-next-app@latest` ships rather than pinning older versions.
Gotchas verified against bundled docs (`node_modules/next/dist/docs`):
`proxy.ts` replaces `middleware.ts`; `cookies()` async; Cache Components left
OFF (opt-in, no benefit for a session-cookie app yet). Supabase JS + ssr
installed but unwired until Phase 1.

## 2026-07-20 · Auth: thin jose-cookie session + Db seam; Supabase Auth deferred

Phase 0 must run from a fresh clone with zero services (DEMO_MODE). Built:
signed HS256 session/pending cookies (jose, edge-safe for proxy.ts), OTP
provider interface (demo = 000000), JSON demo store behind a `Db` interface.
OTP SMS provider decision: **MSG91** (Indian DLT compliance, INR pricing)
over Twilio (pricier for India). Phase 1 decides: Supabase Auth phone OTP vs
MSG91 + own sessions — the seam keeps both open.

## 2026-07-20 · Phone privacy from day 0

Raw numbers never persisted: salted SHA-256 (`AUNTY_PHONE_SALT`) for identity,
`•••••• 1234` mask for display, numbers never in URLs (pending-login state
rides a signed 10-min cookie instead of query params). Rejected: storing E.164
"until launch" — privacy posture is principle 9, not a later feature.

## 2026-07-20 · Design direction: "The Matchmaking Bureau"

One aesthetic risk, committed: Aunty runs a formidable matrimonial _bureau_ —
newspaper-matrimonial editorial + rubber-stamp officialdom. Stamp-pad ink
`#1b2153`, cool paper `#f6f5f1`, rani pink `#d6156c` actions, turmeric accents,
stamp chips with ink-bleed mask, verdicts get literally stamped (the one
orchestrated animation). Rejected: cream+serif+terracotta and black+neon (both
banned by SPEC P6 as default AI-app looks), marigold/Bollywood kitsch.

## 2026-07-20 · Type: Martel display + Anek UI, self-hosted woff2

Martel is a Devanagari-first newspaper serif — the matrimonial-column voice —
with real Latin weights; Anek (Latin/Devanagari/Malayalam siblings) covers UI
with a width axis used for condensed stamp labels. Vendored via
`scripts/vendor-fonts.mjs` (21 subset woff2 files, committed) so builds and
runtime never touch Google Fonts. Rejected: `next/font/google` (build-time
network dependency), Fraunces/Playfair (no Devanagari, default-AI-look).

## 2026-07-20 · The Aunty mark

Geometric SVG: hair sweep + side bun, gold cat-round glasses with half-lidded
judging eyes, rani bindi, jhumka dots, smirk. Three moods (judging / delighted
/ unimpressed) as eye/mouth variants; `currentColor` ink so it themes. No
photoreal faces (SPEC P6). Icons rasterized from it via `scripts/generate-icons.mjs`.

## 2026-07-20 · Name check (SPEC 3.4, non-blocking)

Working name stays **Aunty**. Alternatives logged for the human to mull:
**Rishta Aunty** (clear, long), **Auntyji** (warmer, handle-friendly),
**Nazar** ("the gaze" — moody, may read evil-eye), **Parchi** ("the chit" —
bureau-flavored, obscure), **Chai Pe** (date-idiom, vague). Domains/handles to
be checked when the human picks; `getaunty.app` / `auntyji.app` style
subdomains conceptually likely available vs `aunty.com` certainly not.

## 2026-07-20 · Vercel deploy is the one human step

CI, tests, and dev flow are fully automated, but Vercel needs the human's
account (no credentials in this environment). Documented as a checklist item
in PROGRESS.md + exact steps in CLAUDE.md (root dir `aunty`, three env vars).
