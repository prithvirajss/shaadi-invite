"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { blessings as copy } from "@/content";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { containsProfanity } from "@/lib/profanity";
import { isRateLimited, markSubmitted, BLESSING_RATE_LIMIT_MS } from "@/lib/rateLimit";
import type { Blessing } from "@/types";
import GoldDivider from "./decor/GoldDivider";

export default function BlessingsWall() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [wall, setWall] = useState<Blessing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWall() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("blessings")
        .select("id, name, message, approved, created_at")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(50);
      if (data) setWall(data as Blessing[]);
      setLoading(false);
    }
    loadWall();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError(isHi ? copy.errorEmptyHi : copy.errorEmptyEn);
      return;
    }
    if (!message.trim()) {
      setError(isHi ? copy.errorEmptyHi : copy.errorEmptyEn);
      return;
    }
    if (containsProfanity(message) || containsProfanity(name)) {
      setError(isHi ? copy.errorProfanityHi : copy.errorProfanityEn);
      return;
    }
    if (isRateLimited("blessing", BLESSING_RATE_LIMIT_MS)) {
      setError(isHi ? "आपने हाल ही में आशीर्वाद भेजा है।" : "You've already sent a blessing recently.");
      return;
    }
    if (!isSupabaseConfigured) {
      setError(isHi ? "कुछ त्रुटि हुई।" : "Something went wrong.");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("blessings").insert({
      name: name.trim().slice(0, 100),
      message: message.trim().slice(0, copy.maxChars),
      approved: false,
    });
    setSubmitting(false);

    if (insertError) {
      setError(isHi ? "कुछ त्रुटि हुई।" : "Something went wrong.");
      return;
    }

    markSubmitted("blessing");
    setSubmitted(true);
    setName("");
    setMessage("");
  };

  return (
    <section className="px-6 py-14" id="blessings">
      <h2 className={`text-center text-2xl font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
        {isHi ? copy.titleHi : copy.titleEn}
      </h2>
      <p className={`mt-2 text-center text-sm maroon-text/70 ${isHi ? "font-hindi-body" : "font-english"}`}>
        {isHi ? copy.subtitleHi : copy.subtitleEn}
      </p>
      <GoldDivider className="mx-auto mt-3 mb-8 h-5 w-32 text-[var(--color-gold)]" />

      {submitted ? (
        <p className={`mx-auto max-w-sm text-center text-sm maroon-text/80 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? copy.thankYouHi : copy.thankYouEn}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isHi ? copy.nameLabelHi : copy.nameLabelEn}
            className="w-full rounded-lg border border-[var(--color-gold)]/50 bg-white px-3 py-2.5 text-base maroon-text focus:border-[var(--color-maroon)] focus:outline-none"
            maxLength={100}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isHi ? copy.messagePlaceholderHi : copy.messagePlaceholderEn}
            rows={3}
            maxLength={copy.maxChars}
            className="w-full resize-none rounded-lg border border-[var(--color-gold)]/50 bg-white px-3 py-2.5 text-base maroon-text focus:border-[var(--color-maroon)] focus:outline-none"
          />
          <p className="text-right text-xs maroon-text/50">
            {message.length}/{copy.maxChars}
          </p>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[var(--color-maroon)] px-5 py-3 text-base font-semibold text-[var(--color-ivory)] shadow-md transition active:scale-95 disabled:opacity-60"
          >
            {submitting ? (isHi ? copy.submittingHi : copy.submittingEn) : isHi ? copy.submitHi : copy.submitEn}
          </button>
        </form>
      )}

      <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 max-h-96 overflow-y-auto">
        {!loading && wall.length === 0 && (
          <p className="text-center text-sm maroon-text/60">
            {isHi ? copy.emptyStateHi : copy.emptyStateEn}
          </p>
        )}
        {wall.map((b) => (
          <div key={b.id} className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] p-3">
            <p className="text-sm maroon-text/90">{b.message}</p>
            <p className="mt-1 text-xs font-semibold gold-text">— {b.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
