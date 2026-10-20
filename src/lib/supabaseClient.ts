import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Browser-safe Supabase client using the public anon key.
 * Only allowed to INSERT rsvps/blessings and SELECT approved blessings,
 * per the Row Level Security policies in /supabase/schema.sql.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
