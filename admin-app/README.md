# Admin dashboard — Prithviraj & Palak wedding

A small, separate Next.js app that holds the password-protected RSVP/blessings
admin dashboard. It's split out from the main invitation site because the
main site is statically exported to GitHub Pages (no server), while this
dashboard needs a real server to keep the Supabase **service role key**
secret and to use an httpOnly session cookie for the password gate.

## Why a separate app

GitHub Pages only serves static files. The admin dashboard needs to read
*all* RSVPs and blessings (including unapproved ones and guest phone
numbers) — that requires the Supabase service-role key, which must never
reach the browser. It also needs a real login (httpOnly cookie) rather than
a password check baked into client JS. Both of those need a server, so this
app deploys separately to Vercel's free tier while the main site deploys to
GitHub Pages.

## Setup

```bash
cd admin-app
npm install
cp .env.local.example .env.local   # fill in the values
npm run dev
```

Visit `http://localhost:3000` and log in with `ADMIN_PASSWORD`.

### Environment variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Same Supabase project as the main site — Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → `service_role` (secret) |
| `ADMIN_PASSWORD` | choose your own |

## Deploying to Vercel

1. Push this repo to GitHub (it can be the same repo as the main site — see
   below).
2. In Vercel, "Import Project" and set the **Root Directory** to `admin-app`.
3. Add the three environment variables above in the Vercel project settings.
4. Deploy. You'll get a URL like `shaadi-invite-admin.vercel.app` — bookmark
   it, it's not linked from the public site.

### If this is in the same GitHub repo as the main site

Vercel's "Root Directory" setting (above) handles this — Vercel only builds
`admin-app/` and ignores the rest. The main site's own deploy (GitHub Pages,
via the Actions workflow in the repo root) is unaffected.
