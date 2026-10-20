-- ============================================================
-- Wedding invitation site — Supabase schema + RLS policies
-- Run this in the Supabase SQL editor for your project.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- RSVPs ----------
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  guest_count integer not null default 1 check (guest_count > 0 and guest_count <= 20),
  events text[] not null default '{}',
  created_at timestamptz not null default now(),
  ip_hash text -- used for lightweight rate limiting, not personally identifying
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
create index if not exists rsvps_phone_idx on public.rsvps (phone);

alter table public.rsvps enable row level security;

-- Anyone (anon key) can insert an RSVP.
drop policy if exists "Allow public insert on rsvps" on public.rsvps;
create policy "Allow public insert on rsvps"
  on public.rsvps for insert
  to anon
  with check (true);

-- No public select/update/delete. Admin reads happen via the service role key
-- on the server only (service role bypasses RLS by design).
drop policy if exists "No public select on rsvps" on public.rsvps;

-- ---------- Blessings ----------
create table if not exists public.blessings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null check (char_length(message) <= 300),
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  ip_hash text
);

create index if not exists blessings_created_at_idx on public.blessings (created_at desc);
create index if not exists blessings_approved_idx on public.blessings (approved);

alter table public.blessings enable row level security;

-- Anyone can insert a blessing (starts unapproved).
drop policy if exists "Allow public insert on blessings" on public.blessings;
create policy "Allow public insert on blessings"
  on public.blessings for insert
  to anon
  with check (approved = false);

-- Anyone can read ONLY approved blessings (for the public blessings wall).
drop policy if exists "Allow public select of approved blessings" on public.blessings;
create policy "Allow public select of approved blessings"
  on public.blessings for select
  to anon
  using (approved = true);

-- Updates (approve) and deletes happen only via the service role key (admin),
-- which bypasses RLS — no public policy is defined for update/delete.
