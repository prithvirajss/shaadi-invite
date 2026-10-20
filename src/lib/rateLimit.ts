// Simple client-side rate limiter using localStorage.
// Since RSVP/blessing inserts go directly from the browser to Supabase
// (public insert-only RLS policy), rate limiting happens client-side to
// prevent accidental double-submits and casual spam. It is not a substitute
// for server-side protection against a determined attacker; Supabase's own
// request-rate limits provide a backstop.

const STORAGE_PREFIX = "wedding-rate-limit:";

export function isRateLimited(key: string, windowMs: number): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (!stored) return false;
    const lastSubmitted = Number(stored);
    return Date.now() - lastSubmitted < windowMs;
  } catch {
    return false;
  }
}

export function markSubmitted(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, String(Date.now()));
  } catch {
    // ignore (e.g. private browsing mode blocking localStorage)
  }
}

export const RSVP_RATE_LIMIT_MS = 60_000; // 1 submission per minute
export const BLESSING_RATE_LIMIT_MS = 30_000; // 1 blessing per 30 seconds
