-- City waitlist (SPEC 4.11: landing page collects city demand pre-launch).
-- RLS on with zero client policies: only the server (service role) touches it.

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  city text not null,
  phone_hash text not null unique,
  phone_masked text not null,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;
