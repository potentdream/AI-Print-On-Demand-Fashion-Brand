# Aunty — build progress

Rule: work the **topmost unchecked item** unless the human says otherwise.
Do not start a phase until the previous phase's ✅ criteria pass. Source of
truth for scope: `SPEC.md` PART 7.

## Phase 0 — Foundation

- [x] Repo + branch workflow (building in `aunty/` — see DECISIONS 2026-07-20)
- [x] Next.js 16 + TS strict + Tailwind v4 scaffold (pnpm)
- [x] Design tokens chosen, documented in CLAUDE.md, implemented in globals.css
- [x] Living docs: CLAUDE.md / PROGRESS.md / DECISIONS.md / SPEC.md
- [x] Auth skeleton: phone → OTP → session (jose cookies) with DEMO_MODE bypass
      (fixed OTP 000000, JSON demo store, rate limits)
- [x] Supabase scaffold: client helpers, RLS-on schema draft, env documented
- [x] PWA basics: manifest, service worker + offline page, icons, Aunty mark
- [x] Tests green: phone normalization, session tokens, rate limiter
- [x] CI: lint + typecheck + test + build on push (`aunty-ci.yml`)
- [ ] **Deployed skeleton on Vercel** — human step: CLAUDE.md → “Deploy”, then
      check this box and paste the URL here: `______`

✅ criteria: fresh clone → `pnpm dev` works per CLAUDE.md _(verified)_;
deployed URL live _(pending human)_.

## Phase 1 — Identity & the first laugh

- [x] Landing page in full Aunty voice (3 sample verdict cards, city waitlist —
      hero, bureau process, house rules, waitlist with 12 launch cities)
- [ ] Provision Supabase project; wire Db seam + Supabase Auth or keep jose (log it)
- [ ] MSG91 OTP provider behind the existing seam
- [ ] Onboarding flow (SPEC 4.2): one question per screen, < 4 min
  - [ ] OTP → age gate (18+) → name → gender/seeking → city
  - [ ] Community & observance + openness setting (+ inter-faith explainer)
  - [ ] Tone dial (Devout / Curious / Just For Fun)
  - [ ] Birth details (skippable, encrypted, "don't know time" path)
  - [ ] Values sprint (8–10 taps)
  - [ ] Photos (min 2, EXIF stripped) + voice note prompt
  - [ ] Bio Interview (Aunty drafts bio from 3 questions)
- [ ] `lib/ai`: client wrapper (routing, retries, caps, cost log) + Aunty
      constitution + output moderation (verify model strings at docs.claude.com)
- [ ] Profile storage w/ RLS; media pipeline (EXIF strip, resize, blurhash, AI screen)
- [ ] Aunty's First Verdict: shareable roast-card image (server-rendered)
- [ ] ✅ a new user on a phone can sign up and share a roast card in < 5 min

## Phase 2 — Compatibility engines

- [ ] `lib/astro`: ephemeris behind interface (Swiss Ephemeris or fallback + Lahiri)
- [ ] Historical-timezone-safe birth data → rashi, nakshatra+pada, lagna
- [ ] Ashtakoot: all 8 kootas, Nadi/Bhakoot cancellations, Mangal dosha flag
- [ ] 5+ golden tests incl. one Nadi-dosha and one Bhakoot-dosha pair
- [ ] Modules A–D behind one interface `{score, highlights, cautions, aunty_material}`
- [ ] Verdict JSON schema + Aunty verdict generation + output moderation
- [ ] ✅ `pnpm test` green incl. goldens; dry-run prints sane verdicts across modules

## Phase 3 — The marketplace

- [ ] Vouch gate (invite code + family vouch) + revocation; waitlist roast hook
- [ ] `pnpm seed`: ~40 fake users, deterministic birth data, time-warp helper
- [ ] `lib/match`: filter → score → curate as pure functions, config weights
- [ ] Property tests: caps, rotation, hard filters, blocked pairs
- [ ] Daily job + `pnpm match:dry-run`; intro accept/pass UX + introduction moment
- [ ] ✅ 40 seeded users → balanced day's intros; two demo users can match

## Phase 4 — Conversations & safety

- [ ] Realtime chat (Supabase Realtime) + voice notes, signed URLs
- [ ] Anti-ghosting: 72h window, 24h nudge, face-saving close; politeness telemetry
- [ ] Report/block everywhere; moderation pipeline + `/admin` review queue
- [ ] Photo liveness verification + human review queue
- [ ] Panic: hide-me, export, true delete; durable rate limiting
- [ ] ✅ match → chat → nudge (time-warped) → report reaches admin; delete deletes

## Phase 5 — Inter-faith hardening + Family Mode

- [ ] Opt-in flow + privacy bundle (hidden from surfaces, blur, watermark, SLA)
- [ ] Family Mode scoped views + family vouch funnel; instant invisible unlink
- [ ] ✅ hardened profile provably absent from every surface (test); family sees
      verdicts, never chat (RLS test)

## Phase 6 — Money

- [ ] Razorpay (UPI) + webhooks + entitlements behind flags; report PDF
- [ ] ✅ sandbox purchase unlocks entitlements; state survives refresh

## Phase 7 — PWA polish & growth

- [ ] Install prompt, offline shell, web-push (FCM-swappable abstraction)
- [ ] Lighthouse mobile ≥ 90 perf/a11y; PostHog funnel; /admin/health; card variants
- [ ] ✅ installed PWA on mid-range Android feels app-like

## Phase 8 — Store port

- [ ] Capacitor wrap, FCM push, store checklist (18+ rating, privacy labels)
- [ ] ✅ signed Android build runs full loop; iOS in simulator

---

## Session log

- **2026-07-20** — Phase 0 built: scaffold, tokens + fonts + Aunty mark, demo
  auth flow (landing → login → OTP → home), PWA basics, tests, CI, docs.
  Remaining: Vercel deploy (human). Next session: start Phase 1 landing page.
- **2026-08-17** — Phase 1 started: full landing page in Aunty's voice, the
  VerdictCard component (the signature bureau document), and the city waitlist
  (12 cities + free text, hashed phones, duplicate-aware). 25 unit + 6 e2e
  tests green. Next: Supabase provisioning (needs human credentials), then the
  onboarding flow.
