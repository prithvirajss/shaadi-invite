import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Browser-safe Supabase client using the public anon key.
 * Only allowed to INSERT rsvps/blessings and SELECT approved blessings,
 * per the Row Level Security policies in /supabase/schema.sql.
 *
 * `createClient` throws synchronously if the URL is empty, which — since
 * this module is imported eagerly by RsvpForm/BlessingsWall — would crash
 * the entire page before React even mounts if the env vars are ever
 * missing (e.g. a build run without the GitHub Actions secrets set yet).
 * Falling back to a harmless placeholder URL keeps the rest of the site
 * working; RsvpForm/BlessingsWall already check `isSupabaseConfigured`
 * before calling anything on this client.
 */
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
