"use server";

import { cookies } from "next/headers";
import { createHash } from "crypto";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabaseServer";

const COOKIE_NAME = "admin_auth";

function expectedToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(password).digest("hex");
}

export async function loginAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!adminPassword) {
    return { success: false, error: "ADMIN_PASSWORD env var is not set." };
  }
  if (password !== adminPassword) {
    return { success: false, error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return { success: true };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return token === expectedToken();
}

async function requireAuth() {
  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated");
  }
}

export interface RsvpRow {
  id: string;
  name: string;
  phone: string;
  guest_count: number;
  events: string[];
  created_at: string;
}

export interface BlessingRow {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  created_at: string;
}

export async function getRsvps(): Promise<RsvpRow[]> {
  await requireAuth();
  if (!isSupabaseAdminConfigured) return [];
  const { data, error } = await supabaseAdmin
    .from("rsvps")
    .select("id, name, phone, guest_count, events, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getBlessings(): Promise<BlessingRow[]> {
  await requireAuth();
  if (!isSupabaseAdminConfigured) return [];
  const { data, error } = await supabaseAdmin
    .from("blessings")
    .select("id, name, message, approved, created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function approveBlessing(id: string): Promise<void> {
  await requireAuth();
  const { error } = await supabaseAdmin.from("blessings").update({ approved: true }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteBlessing(id: string): Promise<void> {
  await requireAuth();
  const { error } = await supabaseAdmin.from("blessings").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
