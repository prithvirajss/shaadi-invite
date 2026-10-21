"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { events, rsvp } from "@/content";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { isRateLimited, markSubmitted, RSVP_RATE_LIMIT_MS } from "@/lib/rateLimit";
import type { EventKey } from "@/types";
import GoldDivider from "./decor/GoldDivider";

export default function RsvpForm({
  defaultName,
  visibleKeys,
}: {
  defaultName: string | null;
  visibleKeys: EventKey[] | null;
}) {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const availableEvents = visibleKeys ? events.filter((e) => visibleKeys.includes(e.key)) : events;

  const [name, setName] = useState(defaultName ?? "");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState<EventKey[]>(
    availableEvents.map((e) => e.key)
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleEvent = (key: EventKey) => {
    setSelectedEvents((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const validate = (): string | null => {
    if (!name.trim()) return isHi ? rsvp.errorNameHi : rsvp.errorNameEn;
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) return isHi ? rsvp.errorPhoneHi : rsvp.errorPhoneEn;
    if (selectedEvents.length === 0) return isHi ? rsvp.errorEventsHi : rsvp.errorEventsEn;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (isRateLimited("rsvp", RSVP_RATE_LIMIT_MS)) {
      setError(isHi ? rsvp.errorRateLimitHi : rsvp.errorRateLimitEn);
      return;
    }

    if (!isSupabaseConfigured) {
      setError(isHi ? rsvp.errorGenericHi : rsvp.errorGenericEn);
      return;
    }

    setSubmitting(true);
    // Routed through an RPC function rather than a direct table insert —
    // see supabase/schema.sql for why (PostgREST's auto-generated
    // insert route was unreliable for this project; the RPC path isn't).
    const { error: insertError } = await supabase.rpc("submit_rsvp", {
      p_name: name.trim(),
      p_phone: phone.trim(),
      p_guest_count: guestCount,
      p_events: selectedEvents,
    });
    setSubmitting(false);

    if (insertError) {
      setError(isHi ? rsvp.errorGenericHi : rsvp.errorGenericEn);
      return;
    }

    markSubmitted("rsvp");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="px-6 py-14 text-center" id="rsvp">
        <h2 className={`text-2xl font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
          {isHi ? rsvp.thankYouTitleHi : rsvp.thankYouTitleEn}
        </h2>
        <p className={`mx-auto mt-3 max-w-sm text-sm leading-relaxed maroon-text/80 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? rsvp.thankYouMessageHi : rsvp.thankYouMessageEn}
        </p>
      </section>
    );
  }

  return (
    <section className="px-6 py-14" id="rsvp">
      <h2 className={`text-center text-2xl font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
        {isHi ? rsvp.titleHi : rsvp.titleEn}
      </h2>
      <p className={`mt-2 text-center text-sm maroon-text/70 ${isHi ? "font-hindi-body" : "font-english"}`}>
        {isHi ? rsvp.subtitleHi : rsvp.subtitleEn}
      </p>
      <GoldDivider className="mx-auto mt-3 mb-8 h-5 w-32 text-[var(--color-gold)]" />

      <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium maroon-text">
            {isHi ? rsvp.nameLabelHi : rsvp.nameLabelEn}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-gold)]/50 bg-white px-3 py-2.5 text-base maroon-text focus:border-[var(--color-maroon)] focus:outline-none"
            maxLength={100}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium maroon-text">
            {isHi ? rsvp.phoneLabelHi : rsvp.phoneLabelEn}
          </label>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-gold)]/50 bg-white px-3 py-2.5 text-base maroon-text focus:border-[var(--color-maroon)] focus:outline-none"
            maxLength={15}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium maroon-text">
            {isHi ? rsvp.guestCountLabelHi : rsvp.guestCountLabelEn}
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={guestCount}
            onChange={(e) => setGuestCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
            className="w-full rounded-lg border border-[var(--color-gold)]/50 bg-white px-3 py-2.5 text-base maroon-text focus:border-[var(--color-maroon)] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium maroon-text">
            {isHi ? rsvp.eventsLabelHi : rsvp.eventsLabelEn}
          </label>
          <div className="flex flex-col gap-2">
            {availableEvents.map((event) => (
              <label
                key={event.key}
                className="flex items-center gap-2 rounded-lg border border-[var(--color-gold)]/30 bg-white px-3 py-2 text-sm maroon-text/90"
              >
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event.key)}
                  onChange={() => toggleEvent(event.key)}
                  className="h-4 w-4 accent-[var(--color-maroon)]"
                />
                {isHi ? event.nameHi : event.nameEn}
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-[var(--color-maroon)] px-5 py-3 text-base font-semibold text-[var(--color-ivory)] shadow-md transition active:scale-95 disabled:opacity-60"
        >
          {submitting ? (isHi ? rsvp.submittingHi : rsvp.submittingEn) : isHi ? rsvp.submitHi : rsvp.submitEn}
        </button>
      </form>
    </section>
  );
}
