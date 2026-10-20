"use client";

import { useLanguage } from "@/context/LanguageContext";
import { events, timelineTitle, baratNote } from "@/content";
import EventCard from "./EventCard";
import GoldDivider from "./decor/GoldDivider";
import type { EventKey } from "@/types";

export default function EventTimeline({ visibleKeys }: { visibleKeys: EventKey[] | null }) {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const filteredEvents = visibleKeys ? events.filter((e) => visibleKeys.includes(e.key)) : events;

  return (
    <section className="px-6 py-14" id="timeline">
      <h2 className={`text-center text-2xl font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
        {isHi ? timelineTitle.hi : timelineTitle.en}
      </h2>
      <GoldDivider className="mx-auto mt-3 mb-8 h-5 w-32 text-[var(--color-gold)]" />

      <div className="mx-auto flex max-w-md flex-col gap-4">
        {filteredEvents.map((event) => (
          <EventCard key={event.key} event={event} />
        ))}
      </div>

      {(!visibleKeys || visibleKeys.includes("varNikasi")) && (
        <p
          className={`mx-auto mt-6 max-w-md rounded-xl bg-[var(--color-maroon)]/5 p-4 text-center text-sm leading-relaxed maroon-text/80 ${isHi ? "font-hindi-body" : "font-english"}`}
        >
          {isHi ? baratNote.hi : baratNote.en}
        </p>
      )}
    </section>
  );
}
