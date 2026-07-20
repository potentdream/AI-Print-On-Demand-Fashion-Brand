-- Aunty · initial schema draft (Phase 0).
-- Applied to a real Supabase project in Phase 1 (supabase db push); expect this
-- file to grow the full SPEC 5.3 tables then. Two rules hold from the first
-- table (SPEC 5.1/5.10): RLS is ON for everything, and clients get no access
-- that a policy doesn't explicitly grant.

create table public.users (
  id uuid primary key default gen_random_uuid(),
  phone_hash text not null unique,      -- salted SHA-256; the raw number is never stored
  phone_masked text not null,           -- "•••••• 3210", display only
  dob date,                             -- set during onboarding; 18+ enforced in app AND here
  gender text,
  city text,
  state text not null default 'waitlisted'
    check (state in ('waitlisted', 'active', 'hidden', 'banned')),
  created_at timestamptz not null default now(),
  constraint adults_only check (dob is null or dob <= (now() - interval '18 years'))
);

alter table public.users enable row level security;

-- A user may read and update their own row; nobody else's. No client inserts —
-- user creation happens server-side (service role) at OTP verification.
create policy "users read own" on public.users
  for select using ((select auth.uid()) = id);
create policy "users update own" on public.users
  for update using ((select auth.uid()) = id);

create table public.profiles (
  user_id uuid primary key references public.users (id) on delete cascade,
  name text,
  photos jsonb not null default '[]'::jsonb,
  voice_note_path text,
  bio text,
  prompts jsonb not null default '{}'::jsonb,
  verified boolean not null default false,
  blur_default boolean not null default true,  -- women-first default (SPEC 4.3)
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles read own" on public.profiles
  for select using ((select auth.uid()) = user_id);
create policy "profiles upsert own" on public.profiles
  for insert with check ((select auth.uid()) = user_id);
create policy "profiles update own" on public.profiles
  for update using ((select auth.uid()) = user_id);

-- Cross-user profile visibility (intros, matches) arrives with the intros
-- tables in Phase 3 — visibility will be granted per-intro, never globally.
