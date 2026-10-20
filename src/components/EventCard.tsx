"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/content";
import type { WeddingEvent } from "@/types";
import { downloadIcs } from "@/lib/ics";

export default function EventCard({ event }: { event: WeddingEvent }) {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const name = isHi ? event.nameHi : event.nameEn;
  const venue = isHi ? event.venueHi : event.venueEn;

  return (
    <div className="relative rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-ivory)] p-5 shadow-[0_2px_10px_rgba(107,15,26,0.08)]">
      <div className="absolute left-0 top-5 h-8 w-1.5 rounded-r-full bg-[var(--color-gold)]" />
      <h3 className={`pl-2 text-lg font-semibold maroon-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
        {name}
      </h3>
      <p className={`pl-2 mt-1 text-sm gold-text ${isHi ? "font-hindi-body" : "font-english"}`}>
        {isHi ? event.dayDateHi : event.dayDateEn}
      </p>
      <p className={`pl-2 text-sm font-medium maroon-text/90 ${isHi ? "font-hindi-body" : "font-english"}`}>
        {isHi ? event.timeHi : event.timeEn}
      </p>
      <p className={`pl-2 mt-2 text-sm leading-relaxed maroon-text/80 ${isHi ? "font-hindi-body" : "font-english"}`}>
        {venue}
      </p>
      {(event.noteHi || event.noteEn) && (
        <p className={`pl-2 mt-1 text-xs italic maroon-text/60 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? event.noteHi : event.noteEn}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2 pl-2">
        <button
          onClick={() => downloadIcs(event, name, venue)}
          className="rounded-full border border-[var(--color-maroon)] px-3 py-1.5 text-xs font-semibold maroon-text transition active:scale-95"
        >
          {isHi ? ui.calendarButtonHi : ui.calendarButtonEn}
        </button>
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[var(--color-maroon)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ivory)] transition active:scale-95"
        >
          {isHi ? ui.directionsButtonHi : ui.directionsButtonEn}
        </a>
      </div>
    </div>
  );
}
