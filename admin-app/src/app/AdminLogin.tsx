"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.set("password", password);
    const result = await loginAction(formData);
    setLoading(false);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error ?? "Incorrect password.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-maroon)] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-[var(--color-ivory)] p-6 shadow-xl"
      >
        <h1 className="mb-4 text-center text-xl font-semibold maroon-text">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-3 w-full rounded-lg border border-[var(--color-gold)]/50 px-3 py-2.5 maroon-text focus:outline-none"
          autoFocus
        />
        {error && <p className="mb-3 text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[var(--color-maroon)] px-4 py-2.5 font-semibold text-[var(--color-ivory)] disabled:opacity-60"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </main>
  );
}
