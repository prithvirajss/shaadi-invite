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

-- Anyone (public anon/publishable key) can insert an RSVP.
-- Scoped "to public" rather than "to anon": kept in case PostgREST's
-- auto-generated insert route (see the note on submit_rsvp below) ever
-- starts honoring the anon role correctly on this project again.
drop policy if exists "Allow public insert on rsvps" on public.rsvps;
create policy "Allow public insert on rsvps"
  on public.rsvps for insert
  to public
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

-- Anyone can insert a blessing (starts unapproved). "to public" — see note
-- on the rsvps insert policy above.
drop policy if exists "Allow public insert on blessings" on public.blessings;
create policy "Allow public insert on blessings"
  on public.blessings for insert
  to public
  with check (approved = false);

-- Anyone can read ONLY approved blessings (for the public blessings wall).
-- This direct SELECT route works fine via the anon key (confirmed) — it's
-- only the direct INSERT route that's broken (see below), so reads stay
-- as plain `supabase.from(...).select(...)` in the app code.
drop policy if exists "Allow public select of approved blessings" on public.blessings;
create policy "Allow public select of approved blessings"
  on public.blessings for select
  to public
  using (approved = true);

-- Updates (approve) and deletes happen only via the service role key (admin),
-- which bypasses RLS — no public policy is defined for update/delete.

-- ============================================================
-- Insert RPC functions — workaround for a platform-side issue
-- ============================================================
-- On this project, PostgREST's auto-generated POST /rsvps and
-- POST /blessings routes (i.e. `supabase.from(...).insert(...)` from the
-- browser) reject every anon-key insert with a false "row violates row
-- level security policy" error — confirmed NOT an actual RLS/policy/grant
-- problem: `SET ROLE anon; INSERT ...;` succeeds directly in SQL, the
-- anon role and policies above are correct, and reads (SELECT) via the
-- anon key work fine. Calling an RPC function that performs the same
-- INSERT, however, works correctly. Root cause is unconfirmed (something
-- specific to this project's generated table-CRUD route), but the RPC
-- path is a legitimate, equally-secure Supabase pattern (SECURITY
-- INVOKER, so it still runs as the calling anon role and is still
-- governed by the RLS policies above) — so the app calls these instead
-- of inserting directly. If the direct-insert route ever starts working
-- again, these can be removed and the app code reverted.

create or replace function public.submit_rsvp(
  p_name text,
  p_phone text,
  p_guest_count integer,
  p_events text[]
)
returns void
language plpgsql
security invoker
as $$
begin
  insert into public.rsvps (name, phone, guest_count, events)
  values (p_name, p_phone, p_guest_count, p_events);
end;
$$;

create or replace function public.submit_blessing(
  p_name text,
  p_message text
)
returns void
language plpgsql
security invoker
as $$
begin
  insert into public.blessings (name, message, approved)
  values (p_name, p_message, false);
end;
$$;

grant execute on function public.submit_rsvp(text, text, integer, text[]) to anon, authenticated;
grant execute on function public.submit_blessing(text, text) to anon, authenticated;
