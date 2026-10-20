# पृथ्वीराज संग पलक — Wedding Invitation Website

A mobile-first digital wedding invitation built with Next.js (App Router), TypeScript, Tailwind CSS,
Framer Motion and Supabase. Royal Rajputana theme (deep maroon, gold, ivory) with original SVG
jharokha/mandala/paisley motifs — no third-party images used.

This is **two apps**:

- **`/` (this folder)** — the public invitation site. Fully static (`output: "export"`), deployed to
  **GitHub Pages** at `https://prithvirajss.github.io/shaadi-invite/`.
- **`/admin-app`** — the password-protected RSVP/blessings dashboard, a separate small Next.js app
  deployed to **Vercel**. See `admin-app/README.md`.

## Why two apps

GitHub Pages only serves static files — no server. RSVP and blessing *submissions* work fine on static
hosting (they insert straight from the browser into Supabase using the public anon key, under the RLS
policies in `supabase/schema.sql`). But *reading* all RSVPs/blessings (names, phone numbers, unapproved
blessings) needs the Supabase **service-role key**, which must never reach the browser, plus a real
login (httpOnly cookie) — both need a server. So the admin dashboard lives in `admin-app/`, deployed
separately to Vercel, while the invite site itself stays a plain static export on GitHub Pages.

## Tech stack

- **Next.js 16 (App Router) + TypeScript**, statically exported (`output: "export"`). Below-the-fold
  sections are code-split with `next/dynamic` to keep the first paint light on 4G.
- **Tailwind CSS v4** for styling, **Framer Motion** for the opening-screen door animation (kept light,
  and respects `prefers-reduced-motion`).
- **Fonts** via `next/font`: Yatra One (Hindi headings), Mukta (Hindi body), Cormorant Garamond (English).
- **Supabase (Postgres)** for RSVPs and the Blessings Wall — see `/supabase/schema.sql` for the schema
  and Row Level Security policies. Inserts are public (anon key, from the browser); all reads for the
  admin dashboard go through the service-role key in `admin-app`, on a real server, never in this app.

## Project structure

```
src/
  app/
    page.tsx                — wraps HomeClientWrapper in Suspense (static export needs this)
    layout.tsx               — fonts, OG meta
    manifest.ts               — PWA manifest (App Router convention, basePath-aware)
  components/
    HomeClientWrapper.tsx    — reads ?name=/?events= client-side via useSearchParams
    HomeClient.tsx            — composes all sections, lazy-loads below-the-fold ones
    decor/                    — original inline SVG motifs (jharokha arch, mandala, paisley, gold divider)
  content.ts                  — ALL copy (Hindi + English), event dates/times/venues, config/links
  lib/                        — supabaseClient (anon only), ics, profanity, rateLimit, basePath
  context/LanguageContext.tsx
supabase/schema.sql            — run this in the Supabase SQL editor
scripts/generate-links.ts      — reads guests.csv, outputs personalized links + WhatsApp send URLs
guests.csv                     — sample input for the script above
.github/workflows/deploy.yml   — builds + deploys this app to GitHub Pages on push to main
admin-app/                     — separate Next.js app: the password-gated dashboard (deploys to Vercel)
```

## Setup (main site)

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

### Environment variables (main site)

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |

(`NEXT_PUBLIC_BASE_PATH` is set automatically in CI — see Deploying, below. No admin/service-role vars
live here; those are in `admin-app/.env.local.example`.)

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run the contents of `supabase/schema.sql`. This creates the `rsvps` and
   `blessings` tables with Row Level Security enabled: public insert only, and public select of
   blessings is restricted to rows where `approved = true`.
3. Copy the Project URL and anon key into `.env.local` (and the same URL + the service-role key into
   `admin-app/.env.local`).

## Personalization

- `?name=<Guest Name>` → shown on the opening screen ("प्रिय {name}, आपका सादर स्वागत है") and
  prefilled into the RSVP name field.
- `?events=mp` (or any comma-separated short codes: `mp,gp,md,hl,sg,vn,sl,as`) → only those events show
  in the timeline and as RSVP checkboxes. Omit the param to show every event.

### Generating personalized links for all your guests

1. Fill in `guests.csv` (columns: `name,phone,events` — `events` is `all` or semicolon-separated codes,
   e.g. `mp` or `gp;md;hl`).
2. Run:
   ```bash
   npx tsx scripts/generate-links.ts guests.csv https://prithvirajss.github.io/shaadi-invite
   ```
3. This prints each guest's personalized link and ready-to-send WhatsApp URL
   (`https://wa.me/<phone>?text=...`), and writes them all to `generated-links.csv`
   (already git-ignored, since it contains phone numbers).

## Deploying

### Main site → GitHub Pages

1. Push this repo to `github.com/prithvirajss/shaadi-invite` (public repo — GitHub Pages on the free
   tier requires it; nothing secret lives in this repo, keys and guest data are all git-ignored).
2. In the repo settings → **Pages**, set Source to **GitHub Actions**.
3. In repo settings → **Secrets and variables → Actions**, add `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` as repository secrets (the workflow reads them at build time; they
   end up in the public JS bundle either way since they're the anon key, but keeping them as secrets
   avoids hardcoding your Supabase URL in the repo history).
4. Push to `main`. `.github/workflows/deploy.yml` builds the static export and deploys it automatically.
   Your site will be live at `https://prithvirajss.github.io/shaadi-invite/`.

`next.config.ts` already sets `basePath`/`trailingSlash` for a GitHub Pages **project site** (served
from a subpath); the workflow wires `NEXT_PUBLIC_BASE_PATH` via `actions/configure-pages` automatically.

### Admin dashboard → Vercel

See `admin-app/README.md`. Short version: import the same repo in Vercel, set **Root Directory** to
`admin-app`, add its three env vars, deploy.

## Fill-in checklist before sending invites

- [ ] **Mata Pujan time** — `config.mataPujanTimeHi` / `mataPujanTimeEn` in `src/content.ts` (currently
      a placeholder: "समय शीघ्र सूचित किया जाएगा").
- [x] **Royal Palace Resort (Devas) coordinates** — set in `DEVAS_VENUE_MAP_URL` in `src/content.ts`
      (22.9917628, 76.0145183).
- [x] **Indore residence coordinates** — set in `INDORE_VENUE_MAP_URL` in `src/content.ts`
      (22.736381, 75.774671).
- [ ] **Shehnai music file** — replace the empty placeholder at `public/audio/shehnai.mp3` with a real
      (royalty-cleared) MP3.
- [ ] **Supabase keys** — `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
      and as GitHub Actions repo secrets; all three vars in `admin-app/.env.local` and in Vercel.
- [ ] **Admin password** — `ADMIN_PASSWORD` in `admin-app/.env.local` / Vercel settings.
- [ ] **OG image / app icons** — `public/og-image.png` (1200×630) and `public/icons/icon-192.png` /
      `icon-512.png` are currently solid-maroon placeholders; swap in designed versions.
- [ ] **Guest list** — fill in `guests.csv` and run `scripts/generate-links.ts`.

## Performance notes

- Below-the-fold sections (timeline, family, RSVP, blessings, contact) are loaded via `next/dynamic`.
- All decorative art is inline SVG (no raster images to download for the theme).
- Fonts are self-hosted via `next/font` (no external font requests, automatic subsetting).
- Animations are minimal (door-opening transition, a couple of gentle pulses) and fully disabled under
  `prefers-reduced-motion: reduce`.
- Run `npm run build` then `npx serve out` + Lighthouse (mobile, throttled) to verify the 90+ target
  once real images/audio are in place — placeholder assets in this repo are intentionally tiny.
