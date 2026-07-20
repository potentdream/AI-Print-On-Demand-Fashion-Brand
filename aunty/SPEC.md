# AUNTY — Master Build Prompt (v1)

> **How to use this file:** Paste this entire document as your first message in a fresh Claude Code session (or save it in the repo root as `SPEC.md` and tell Claude Code: "Read SPEC.md and continue from PROGRESS.md"). It is written to be executed **phase by phase** across many sessions, from phone or PC. Do not try to build everything in one session.

---

## PART 0 — SESSION PROTOCOL (read first, every session)

You (Claude Code, running Claude Fable 5) are the founding engineer, designer, and product lead for this app. The human works with you sometimes from a phone, sometimes from a PC, in short and long sessions. To make that work:

1. **On the very first session:** initialize a git repo, connect it to GitHub, and create three living documents in the repo root:
   - `CLAUDE.md` — how to run the project, stack summary, conventions, env vars needed, common commands. Keep it under 150 lines; update it whenever conventions change.
   - `PROGRESS.md` — the phase checklists from PART 7 of this spec, copied in as markdown checkboxes. Check items off as they are completed. Always work on the **topmost unchecked item** unless the human says otherwise.
   - `DECISIONS.md` — an ADR-lite log. Every time you make a significant choice this spec left open (library, schema shape, design direction, feature interpretation), add 3–5 lines: what you chose, why, what you rejected.
2. **On every subsequent session:** read `CLAUDE.md`, `PROGRESS.md`, and the last ~10 entries of `DECISIONS.md` before writing any code. Then state in one short paragraph what you're about to do, and do it.
3. **Commit style:** small, frequent, conventional commits (`feat:`, `fix:`, `design:`, `chore:`). Push at the end of every session so the human can resume from the other device. Never leave the repo in a broken state at session end — if mid-feature, commit behind a feature flag or on a branch.
4. **When the human sends a short message from phone** like "continue," resume from `PROGRESS.md` without asking questions. Save clarifying questions for genuinely blocking ambiguity; otherwise decide, log it in `DECISIONS.md`, and move.
5. **Verify external facts at build time.** For anything about the Anthropic API (current model strings, features, limits), check https://docs.claude.com/en/api/overview rather than assuming. Same for any library: check its current docs before pinning a version.

---

## PART 1 — ROLE & MISSION

Build **Aunty**: an AI-matchmaker dating app for India. Web app first (mobile-first responsive PWA), then packaged for Android and iOS. The product's soul is a cheeky, judgmental, weirdly effective AI "Aunty" who vets, roasts, and hand-delivers a small number of curated introductions — the opposite of infinite swiping.

You have **broad creative freedom** (see PART 9) on aesthetics, microcopy, animations, and feature garnish. You have **zero freedom** on the non-negotiables in PART 2.3 and the safety rules in PART 4.10.

---

## PART 2 — PRODUCT VISION & POSITIONING

### 2.1 One-liner

"Your nosiest aunty, minus the emotional damage: an AI matchmaker who screens everyone so you don't have to."

### 2.2 Who it's for

Urban and semi-urban Indians, roughly 21–35, who find Tinder/Bumble exhausting and Shaadi/Matrimony suffocating. They want **serious dating with intent, on their own terms, with cultural fluency**. Women-first by design: every marketplace decision optimizes for women's experience, because female-side liquidity is what makes or breaks Indian dating apps.

### 2.3 Non-negotiable product principles

1. **Curation over volume.** No infinite swipe deck, ever. Users receive at most 1–3 introductions per day.
2. **Women-first mechanics.** Women's inboxes are protected by supply limits; women get finer-grained visibility and contact controls; men enter via vouch.
3. **Religion is a preference, never a wall.** The app never hard-blocks matches on faith or astrology. Compatibility scores nudge and flavor; they do not gate.
4. **Astrology never gates.** A low guna score is Aunty's spicy opinion, never a rejection or a hidden filter.
5. **Community-aware, not community-segregated.** One app; the compatibility engine and Aunty's register adapt per user's community and observance level.
6. **Inter-faith matching is opt-in and privacy-hardened** (see 4.5). Aunty never moralizes for or against it.
7. **18+ only, strictly enforced at signup.**
8. **Roasts punch at behavior and bios, never at bodies, skin tone, caste, income, disability, or family.** (Full content rules in 3.3.)
9. **Privacy is a feature.** Birth data, religion, and inter-faith preferences are sensitive data — encrypted, minimally exposed, never in analytics.

---

## PART 3 — BRAND & THE AUNTY PERSONA

### 3.1 Who Aunty is

A composite of everyone's most formidable relative: sharp-tongued, deeply invested, secretly soft. She has opinions about everything, a network of "sources," and a 100% confidence rate. She speaks Indian English with natural Hinglish seasoning ("beta," "enough of this nonsense," "I have seen his type"). She is never cruel, never crude, never explicit.

### 3.2 The tone dial (set at onboarding, changeable in settings)

| Mode             | Register                                               | Astrology framing                               |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------- |
| **Devout**       | Respectful, warm, traditional. Aunty as trusted elder. | Full sincere kundli/deen/community readings     |
| **Curious**      | Playful but earnest. Default mode.                     | Astrology as meaningful-but-light guidance      |
| **Just For Fun** | Maximum roast. Ironic, meme-ready.                     | Astrology as personality banter ("chaos twins") |

Aunty also **code-switches by community** (see 4.4): for a practicing Muslim user she never uses astrological framing at all — she becomes the well-connected khala who talks values, deen, and family, not stars.

### 3.3 Roast content rules (hard constraints for every AI output)

- Target: bios, texting habits, red-flag behaviors, clichés, indecisiveness, gym-selfie counts.
- Never target: physical appearance, body, skin tone, caste, religion itself, income, disability, family members, trauma.
- Never: sexual content, profanity beyond mild ("nonsense," "shameless"), anything that could read as harassment if screenshotted alone.
- Every roast must be publishable on the app's own Instagram without apology.
- Implement these as a system-prompt constitution **plus** an output-side moderation check (5.4).

### 3.4 Naming

Working name **Aunty**. During Phase 0, generate 5 alternative names + check domain/handle availability conceptually, log in `DECISIONS.md`, but do not block on it.

---

## PART 4 — FEATURE SPECIFICATION

### 4.1 Access & the vouch gate

- **Women:** join freely (phone OTP + verification, 4.10).
- **Men:** need one **vouch** to activate matching: either (a) an invite code from an existing user of any gender, or (b) a "family vouch" — a link sent to a family member who answers 3 short character questions about him (this doubles as Family Mode onboarding, 4.9, and as marketing gold).
- Vouches are revocable; a user whose vouchees get banned loses invite privileges.
- Waitlist state for unvouched men: they can complete their profile and get one free Aunty bio roast (shareable) — the roast is the hook that makes them chase a vouch.
- `DEMO_MODE=true` env flag bypasses OTP + vouch for local dev, and seeds fake users (PART 8).

### 4.2 Onboarding (mobile-first, one question per screen, < 4 minutes)

1. Phone OTP → age gate (DOB, must be 18+) → name.
2. Gender & who they want to meet.
3. City (used for matching pools; launch is city-scoped).
4. **Community & observance:** religion (Hindu / Muslim / Christian / Sikh / Jain / Parsi / Buddhist / Spiritual / None / Prefer not to say) + observance slider (Very practicing → Culturally connected → Not really). This selects the compatibility module (4.4).
5. **Openness setting:** "Aunty should introduce you to…" → My community only / My community + some others (multi-select) / Open to all. Choosing anything beyond "my community only" reveals the inter-faith opt-in explainer (4.5).
6. **Tone dial** (3.2).
7. **Birth details (Hindu/Curious/Fun paths only, always skippable):** date (already have), time, place — with a prominent "Don't know my birth time" path that falls back to sun-sign/moon-sign-approx mode. Birth data screen must state plainly what it's used for and that it's encrypted.
8. Values sprint: 8–10 fast taps (family involvement expectations, kids, relocation, smoking/drinking, ambition style, love language-ish). Designed to feed all compatibility modules.
9. Photos (min 2) + one voice note prompt (optional but heavily encouraged by Aunty: "Beta, let them hear you").
10. **The Bio Interview:** instead of a blank bio box, Aunty asks 3 chatty questions and drafts the bio from the answers; user edits. End of onboarding = **Aunty's First Verdict**: a shareable roast card of their own profile (4.11). This is the aha moment — make it land.

### 4.3 Profiles

- Photos blur-by-default until mutual match **for women (their choice, default on)**; men's photos visible. EXIF stripped on upload.
- Sections: Aunty's one-line verdict on them, values badges, community/observance (visibility controlled by owner), voice note, prompts.
- Verification badge (4.10). No public last-seen, no read receipts by default.

### 4.4 The compatibility layer (modular engines)

One interface, four pluggable modules. Every module returns `{ score: 0–100, highlights: [], cautions: [], aunty_material: [] }`. Module choice per user pair is derived from both users' community + tone settings; mixed pairs use the **values module as the shared spine** plus each user's own flavor layer in their own view.

- **Module A — Vedic (Hindu, Devout/Curious):** real ashtakoot guna milan out of 36 (weights: Varna 1, Vashya 2, Tara 3, Yoni 4, Graha Maitri 5, Gana 6, Bhakoot 7, Nadi 8), Mangal dosha flag (implement the common convention — Mars in houses 1/2/4/7/8/12 from lagna and from Moon — and document the convention chosen in `DECISIONS.md`), with plain-language explanations. Full engine spec in 5.5.
- **Module B — Deen & values (Muslim users):** no astrology anywhere in this path. Signals: practice level, sect (optional, user-controlled visibility), prayer/lifestyle compatibility, family-involvement expectations, values sprint alignment. Aunty's register: warm rishta-khala energy, zero star talk.
- **Module C — Community & values (Christian / Sikh / Jain / Parsi / Buddhist):** denomination/community (optional), community-continuity importance (explicitly asked, since e.g. Parsi and Jain users often weight endogamy highly), values sprint, family expectations.
- **Module D — Banter (None/Spiritual, Just-For-Fun):** sun/moon sign compatibility played as personality science, values sprint underneath doing the real work.

**Scoring truth:** in every module the values sprint + stated preferences carry the majority of the real score; community/astro layers contribute flavor and a minority weight. Log exact weights in `DECISIONS.md` and make them config, not constants.

### 4.5 Inter-faith opt-in & hardened privacy

- Explicit opt-in with a calm explainer (no drama, no moralizing).
- Users who opt in get an automatic **privacy hardening bundle**: profile hidden from open browse of any kind (there is no public browse anyway, but hardened users are also excluded from share-card defaults, "seen by" surfaces, and any future discovery features), photos blur-until-match regardless of gender, screenshots of their profile watermarked with viewer ID (web can't block screenshots; watermark + policy is the honest deterrent — say so in the safety page), and stricter report-response SLA.
- Inter-faith status is never shown to other users, never in analytics events, encrypted at rest like birth data.
- Aunty's framing for inter-faith intros: exactly as warm as any other intro. The shared **values module** is the compatibility spine; she does not perform "bridging cultures" commentary unless both users' tone dials are Fun.

### 4.6 Matching pipeline & daily intros

Three stages, run as a daily job per city pool (design as a pure, testable pipeline — spec in 5.6):

1. **Filter (hard):** mutual gender prefs, age windows, city/distance, openness settings (4.4/4.5), blocked/reported exclusions, active-in-last-14-days.
2. **Score (soft):** compatibility module score + activity/responsiveness signal + profile completeness. Never rank by attractiveness proxies.
3. **Curate (marketplace balancing):** each woman receives at most N intros/day (start N=3) and each man appears in a bounded number of women's queues; unmatched men wait rather than flooding. Fairness rule: rotate exposure so new/quiet profiles surface (no rich-get-richer). Both sides must accept for a match ("Aunty introduces you" moment with the verdict card).
4. Intro states: `offered → accepted/passed → matched → expired (72h)`. Passing is silent; Aunty softens it ("Not this one, beta. I have others.").

### 4.7 Aunty AI surfaces

- **Aunty chat tab:** the home surface. Users talk to Aunty about their profile, their matches, their nonsense. She remembers per-user context (store distilled facts, not raw transcripts, in `aunty_memory`).
- **Verdict cards:** structured compatibility verdicts per intro (score visual + 2 highlights + 1 caution + one killer line).
- **Bio roast:** on demand, and once free for waitlisted men.
- **Icebreakers:** on match, Aunty drops one opener tailored to both profiles into the chat.
- **Ghost audit (premium later):** "Why did he stop replying?" — Aunty answers with kindness + spice, never with private data about the other user.

### 4.8 Conversations & anti-ghosting

- Chat unlocks only on mutual match. Realtime (5.7), text + voice notes; no images in chat for MVP (safety).
- 72h first-reply window; Aunty nudges at 24h and closes the file at 72h with a face-saving line for both sides. Reopening costs a (later) premium token.
- Politeness telemetry: chronic ghosters quietly get fewer intros (log the rule; never shame publicly).
- Safety in chat: AI moderation pre-screen on messages (5.4); one-tap block/report; "share this chat with Aunty" for a safety read.

### 4.9 Family Mode (opt-in, off by default)

- A user can link one family member with a scoped view: sees intros' compatibility verdicts (community-appropriate: kundli for Devout Hindu families, values/deen framing otherwise), can leave a note ("Ammi approves"), sees zero chat content ever.
- Family vouch flow (4.1b) is the funnel into it.
- Any family-linked account action is visible to the primary user; the primary user can unlink instantly and invisibly.

### 4.10 Safety, verification & moderation (hard requirements)

- Phone OTP at signup (Indian provider — MSG91 or Twilio; decide and log).
- **Photo liveness verification** for the badge: selfie-pose challenge compared to profile photos (start with a vision-model comparison via the API; log accuracy caveats; human review queue for fails).
- Report/block: one tap from every surface; blocking is immediate and mutual-invisible.
- Moderation pipeline: every profile text, photo, and first-N chat messages pass an AI screen (5.4); flagged content → human review queue (a simple internal `/admin` route, auth-gated).
- Grievance & takedown flow per Indian IT Rules expectations: in-app report → acknowledged with ticket ID → resolution surfaced. Add a grievance-contact placeholder page.
- Panic affordances: women can hide their profile instantly ("Aunty, make me invisible"), export their data, and delete account (true delete, 5.10).
- New-user education: one screen of safety norms written in Aunty's voice, not legalese.

### 4.11 Growth loops & share cards

- **Roast cards:** every Aunty roast/verdict renders as a beautiful branded image (server-generated OG-style image; use `@vercel/og`/satori or node-canvas — decide and log). Names/photos hidden by default; user can reveal their own first name only. One-tap share to Instagram Stories/WhatsApp.
- **Vouch links** are the referral system (4.1) — track vouch-chain analytics.
- **Waitlist roast** for unvouched men is the top-of-funnel hook.
- Public site (`/`) is a landing page in full Aunty voice with 3 sample roast cards and a city waitlist. This page ships in Phase 1 — it's the marketing asset.

### 4.12 Monetization (build stubs, gate behind flags, activate Phase 6)

- **Aunty Plus:** more intros/day, ghost audits, reopen-expired tokens, full kundli/values deep reports, "muhurat for the first date" (Devout mode), profile insights.
- One-off purchases: detailed compatibility report PDF.
- Payments: Razorpay with UPI (5.9). No ads, ever. No pay-to-message — that breaks principle 1.

---

## PART 5 — TECHNICAL ARCHITECTURE

### 5.1 Stack (recommended; you may swap with justification in `DECISIONS.md`)

- **Frontend/backend:** Next.js (App Router) + TypeScript + Tailwind. One monolith. PWA from day 1 (manifest, service worker, installable, offline shell for Aunty chat history).
- **Data/auth/realtime/storage:** Supabase (Postgres + Auth + Realtime + Storage) with **Row Level Security on from the first table**. Rationale: solo-builder speed, realtime chat built in, RLS = privacy posture. Acceptable swap: Postgres+Prisma on Railway/Fly with a websocket layer, or Firebase — only with a logged reason.
- **AI:** Anthropic API (5.4). **Astrology:** in-repo engine (5.5). **Jobs/cron:** Vercel Cron or Supabase scheduled functions for the daily matching run. **Hosting:** Vercel (or Netlify).
- Package manager pnpm; strict TS; ESLint + Prettier.

### 5.2 Repo layout (guide, not straitjacket)

```
/app            # Next.js routes (marketing, onboarding, home, chat, admin)
/components     # UI
/lib/ai         # Aunty prompts, model client, moderation, schemas
/lib/astro      # ephemeris + ashtakoot engine (pure functions)
/lib/match      # filter/score/curate pipeline (pure functions)
/lib/db         # queries, RLS-aware client helpers
/jobs           # daily matching, expiry sweeps, digest
/tests          # unit + golden + e2e (Playwright)
CLAUDE.md  PROGRESS.md  DECISIONS.md  SPEC.md
```

### 5.3 Data model (Postgres; adjust as needed, log changes)

Core tables (all with RLS):

- `users` (auth id, phone hash, dob, gender, city, created_at, state: waitlisted/active/hidden/banned)
- `profiles` (user_id, name, photos[], voice_note, bio, prompts, verified, blur_default)
- `community_settings` (user_id, religion, observance, tone_mode, openness enum, open_to[] — **sensitive, encrypted columns where feasible**)
- `birth_data` (user_id, date, time?, place, lat/lng, tz, precision enum — **encrypted at rest, never selected into client bundles**)
- `values_answers` (user_id, key, value)
- `vouches` (voucher_id?, family_contact?, vouchee_id, type: user/family, status, answers jsonb)
- `intros` (id, a_user, b_user, day, module_used, score, verdict jsonb, state, expires_at)
- `matches` (intro_id, matched_at, closed_at?, closed_by: expiry/user/aunty)
- `conversations` / `messages` (match_id, sender, kind: text/voice, body, moderation_state)
- `aunty_memory` (user_id, fact, source, updated_at)
- `reports` (reporter, target, surface, reason, status, ticket_code) · `blocks`
- `family_links` (primary_user, family_contact, scope, status)
- `share_cards` (user_id, kind, payload jsonb, image_path, reveal_level)
- `subscriptions` / `payments` (Razorpay refs) — Phase 6
- `events` (analytics; **never** contains religion, birth, inter-faith, or message content)

### 5.4 AI layer

- Client wrapper in `/lib/ai` with: model routing, retry/backoff, token caps, per-user rate limits, response caching (roasts for identical inputs), and cost logging per call type.
- **Model routing (verify current strings at docs.claude.com before pinning):** high-volume/cheap calls (moderation triage, icebreakers, nudges) → Haiku-class (`claude-haiku-4-5` family); quality calls (verdicts, bio interview, Aunty chat) → Sonnet-class (`claude-sonnet-4-6`); reserve Fable/Opus-class for offline prompt-tuning and hard cases only. Make routing config-driven.
- **Prompt architecture:** one Aunty constitution (persona + 3.3 content rules + tone-dial and community register instructions) shared across calls; per-surface task prompts layered on top; user context injected as distilled `aunty_memory` facts, never raw chat logs.
- **Structured outputs:** verdicts and roasts must return strict JSON via tool-use/structured output, e.g.

```json
{
  "score": 27,
  "out_of": 36,
  "module": "vedic",
  "highlights": ["…", "…"],
  "caution": "…",
  "aunty_line": "…",
  "share_safe": true
}
```

- **Output moderation:** a second cheap pass checks every user-visible AI line against the 3.3 rules; on fail, regenerate once, then fall back to a safe canned line. Also run inbound-message moderation (harassment, contact-info extraction pressure, minors, self-harm signals → escalate to human queue with resources surfaced per your safety judgment).
- Log prompts/outputs for the admin queue with PII minimized.

### 5.5 Astrology engine (`/lib/astro`, pure + tested)

- **Ephemeris:** prefer a Swiss Ephemeris binding (e.g. the `swisseph` npm package) with **Lahiri ayanamsa** for sidereal positions. If native bindings fight the deploy target, fall back to `astronomy-engine` (tropical) + applied Lahiri ayanamsa offset, and log the accuracy tradeoff. Isolate behind an interface so the backend can swap.
- **Inputs:** date, time (or precision=day → sun/moon-approx mode), place → lat/lng + **historical timezone** resolution (use a tz library that handles historical offsets; this is a classic bug source — test it).
- **Outputs:** rashi (moon sign), nakshatra + pada, lagna (only when time known), navamsa optional later.
- **Ashtakoot scoring:** implement all 8 kootas as pure functions with the standard tables (Varna 1, Vashya 2, Tara 3, Yoni 4, Graha Maitri 5, Gana 6, Bhakoot 7, Nadi 8; total 36). Include the widely used Nadi/Bhakoot cancellation exceptions, and document which convention you implemented.
- **Golden tests:** hand-compute 5+ known pairs (include at least one Nadi-dosha and one Bhakoot-dosha case) and lock them as unit tests before wiring to the product.
- **Fallback modes:** no-birth-time → moon-sign approximation with a visible "approximate" tag; sun-sign-only for Module D. Never fabricate precision.

### 5.6 Matching service (`/lib/match`, pure + tested)

- Implement filter → score → curate as pure functions over plain data; the daily job just feeds them. Property tests: no intro violates hard filters; no woman exceeds N/day; exposure rotation actually rotates; blocked pairs never meet.
- All weights/caps in a config file. Ship a `pnpm match:dry-run` script that prints a day's proposed intros for the seed data — the human will use this constantly.

### 5.7 Realtime chat

Supabase Realtime channels per conversation; optimistic send; voice notes to Storage with signed URLs; delivery states minimal (sent/delivered only). Moderation hook runs async post-send with retraction on hard flags.

### 5.8 Media pipeline

Upload → strip EXIF → resize variants → blurhash placeholder → AI photo screen (nudity/violence/minor-risk → queue). Signed URLs only; no public buckets.

### 5.9 Payments (Phase 6)

Razorpay (UPI + cards), server-verified webhooks, subscription table, feature flags read entitlements. Keep every premium feature behind a flag from day one so the free product is testable.

### 5.10 Security, privacy & compliance posture

- Build toward India's **DPDP Act 2023**: clear consent screens at data collection (especially birth data + community), purpose limitation, data-principal rights (export + true deletion flows in-app), breach-readiness notes in `CLAUDE.md`. Add a plain-language privacy page written by you in a human voice. (This is engineering posture, not legal advice — flag in `DECISIONS.md` that a lawyer review is a pre-launch task.)
- IT Rules-style grievance flow (4.10). 18+ enforcement at signup.
- Secrets in env only; RLS everywhere; encrypt `birth_data` and sensitive `community_settings` columns; analytics never see sensitive fields; rate-limit all public endpoints; OWASP basics; dependency audit in CI.

### 5.11 PWA-first → app-store port plan

- Phase 0–7 target: a PWA good enough that "install to home screen" feels native — fast (LCP < 2.5s on mid-range Android), safe-area aware, bottom-nav thumb reachable, works on flaky networks.
- **Port strategy (Phase 8): Capacitor.** Wrap the same Next.js app; add native plugins only where needed (push notifications first — design the notification service now with a web-push + FCM abstraction so Capacitor swap is trivial). Keep all business logic server-side so the wrapper stays thin. Revisit React Native only if Capacitor UX genuinely disappoints; log the evaluation.

### 5.12 Observability & analytics

PostHog (self-serve funnel: signup → verdict card → vouch → first intro → first match → first reply), Sentry for errors, a `/admin/health` dashboard: daily intros sent, acceptance rate, gender ratio, report queue depth, AI spend.

---

## PART 6 — DESIGN DIRECTION

You are the design lead as well. Take one real aesthetic risk and commit to it. Constraints and anchors:

- **World to draw from:** Indian matchmaking's own visual vernacular, reinterpreted — matrimonial newspaper columns, wedding-card foil and ornament, hand-painted signage, mehndi linework, the drama of a verdict. Modern, editorial, confident. **Not** stock Bollywood kitsch, not marigold-clipart, and not the default AI-app look (cream background + serif + terracotta, or black + neon accent). If your palette drifts toward those defaults, stop and re-choose.
- **Signature element:** the **Aunty verdict card** — the scored verdict + roast line as a designed object (this is also the share card, so it's the brand's face on Instagram). Spend your boldness here; keep the rest of the UI disciplined and quiet around it. Consider a reveal moment (scratch/flip/stamp) for verdicts — one orchestrated animation beats ten scattered ones.
- **Aunty herself:** design a simple, ownable illustrated mark (SVG) — expressive enough to have moods (judging, delighted, unimpressed). No photoreal faces.
- **Type:** pair a characterful display face with a clean body face; both must have excellent Devanagari and Malayalam fallbacks (i18n-ready even though v1 copy is English/Hinglish). Set a deliberate scale; let the type carry personality.
- **Microcopy is product.** Every empty state, error, and button is a chance for Aunty's voice — but controls still say exactly what they do ("Send vouch link," not "Let's go!"). Errors explain and direct; they never apologize vaguely.
- **Mobile-first mechanics:** one-hand thumb zones, bottom nav (Aunty / Intros / Chats / You), 44px+ targets, keyboard-safe forms, reduced-motion respected, visible focus states, dark mode from day one.
- Write the chosen tokens (palette hexes, faces, radii, motion rules) into `CLAUDE.md` and derive everything from them. Before building each major screen, sketch the plan in your head, check it against "would any dating app ship this exact screen?" — if yes, push further.

---

## PART 7 — BUILD PHASES & ACCEPTANCE CRITERIA

Copy these into `PROGRESS.md` as checklists. Do not start a phase until the previous phase's criteria pass.

**Phase 0 — Foundation.** Repo, Next.js+TS+Tailwind+Supabase scaffold, auth (OTP w/ DEMO_MODE bypass), CI (lint+test), CLAUDE/PROGRESS/DECISIONS files, design tokens chosen and documented, deployed skeleton on Vercel. ✅ when: fresh clone → `pnpm dev` works per CLAUDE.md; deployed URL live.

**Phase 1 — Identity & the first laugh.** Landing page in full Aunty voice; onboarding flow (4.2) through bio interview; profile storage w/ RLS; media pipeline; **Aunty's First Verdict roast card rendered as a shareable image**. ✅ when: a new user on a phone can sign up and share a roast card in < 5 minutes, and it looks good enough to actually post.

**Phase 2 — Compatibility engines.** `/lib/astro` with golden tests passing; Modules A–D behind one interface; verdict JSON schema + Aunty verdict generation with output moderation. ✅ when: `pnpm test` green including astro goldens; dry-run script prints sane verdicts for seed pairs across all four modules.

**Phase 3 — The marketplace.** Vouch gate + waitlist roast; seed/demo data (PART 8); daily matching job (filter/score/curate) w/ property tests; intro accept/pass UX with the introduction moment. ✅ when: with 40 seeded users, a day's run produces balanced intros (caps respected, rotation working) and two demo users can match.

**Phase 4 — Conversations & safety.** Realtime chat + voice notes; anti-ghosting timers + Aunty nudges; report/block; moderation pipeline + `/admin` review queue; photo verification; hide-me + export + delete flows. ✅ when: full loop works — match → chat → nudge at 24h (time-warped in demo) → report reaches admin queue; delete truly deletes.

**Phase 5 — Inter-faith hardening + Family Mode.** Opt-in flow + privacy bundle (4.5); Family Mode scoped views + family vouch. ✅ when: a hardened profile provably never appears in any surface it shouldn't (write the test); a linked family member sees verdicts but can never load chat data (RLS test).

**Phase 6 — Money.** Razorpay integration, Aunty Plus flags on, compatibility report PDF. ✅ when: sandbox purchase unlocks entitlements and webhook-verified state survives refresh.

**Phase 7 — PWA polish & growth.** Install prompt, offline shell, push notifications (web-push), performance pass (Lighthouse mobile ≥ 90 perf/a11y), PostHog funnel + admin health dashboard, share-card variants. ✅ when: installed PWA on a mid-range Android feels app-like end to end.

**Phase 8 — Store port.** Capacitor wrap, FCM push swap, store-readiness checklist (screenshots, privacy labels, age rating 18+). ✅ when: signed Android build runs the full loop on-device; iOS build runs in simulator.

---

## PART 8 — ENGINEERING CONVENTIONS

- **Tests:** unit for `/lib/astro` (goldens) and `/lib/match` (properties); integration for RLS policies (attempt forbidden reads, expect failure); Playwright e2e for the golden path (onboard → verdict → vouch → intro → match → chat). CI blocks merge on red.
- **Seed/demo:** `pnpm seed` creates ~40 varied fake users across communities, tones, and cities with deterministic birth data (so astro outputs are stable), plus a time-warp helper to fast-forward intro expiry. All fake data clearly fake (names like "Demo Priya").
- **Env vars:** document every one in `CLAUDE.md` with a `.env.example` (Supabase keys, ANTHROPIC_API_KEY, OTP provider, Razorpay, PostHog, Sentry, DEMO_MODE, MATCH_CONFIG path).
- **Feature flags:** simple config-driven flags for premium, Family Mode, inter-faith module, tone experiments.
- **Cost discipline:** AI spend logged per feature; hard daily cap env var that flips Aunty to cached/canned mode rather than erroring.

## PART 9 — CREATIVE FREEDOM CHARTER

Where this spec is silent or open, you decide — boldly, in-brand, logged in `DECISIONS.md`. Explicitly yours: visual identity within PART 6, all microcopy, animation language, the exact roast comedy style per tone mode, extra delight features (Aunty's daily one-liner, streak-free rituals, verdict reveal mechanics), landing-page concept, seed personas' personalities, admin UI. Explicitly not yours to change: PART 2.3 principles, 3.3 content rules, 4.5 privacy bundle, 4.10 safety requirements, 5.10 posture. If a creative idea brushes against a non-negotiable, the non-negotiable wins and the idea gets logged as rejected-with-reason.

## PART 10 — MVP DEFINITION OF DONE

Phases 0–4 complete; one city pool seeded; a stranger can onboard on a phone, laugh at their roast card, get vouched, receive a curated intro with a verdict that respects their community and tone, match, chat safely, and delete everything — while the app never gates on faith or stars, never floods a woman's inbox, and never says anything Aunty couldn't post publicly.

**Begin now with Phase 0.** First actions: create the repo and the three living documents, copy PART 7 into `PROGRESS.md`, choose and log design tokens, then scaffold. State your plan in one paragraph and go.
