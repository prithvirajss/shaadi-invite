import type { WeddingEvent } from "@/types";

function toIcsDate(iso: string): string {
  // Convert ISO (with offset) to UTC basic format YYYYMMDDTHHMMSSZ
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function buildVeventLines(event: WeddingEvent, nameHi: string, venueHi: string, uidSuffix: string): string[] {
  const uid = `${event.key}-${uidSuffix}@prithviraj-palak-wedding`;
  return [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(event.startIso)}`,
    `DTEND:${toIcsDate(event.endIso)}`,
    `SUMMARY:${escapeIcsText(nameHi)}`,
    `LOCATION:${escapeIcsText(venueHi)}`,
    `DESCRIPTION:${escapeIcsText(nameHi + " — पृथ्वीराज संग पलक विवाह समारोह")}`,
    // Reminder 30 minutes before the event — once a guest adds this to
    // their phone's calendar, the calendar app itself handles the
    // notification (no server, no push permissions, works offline).
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(nameHi + " 30 मिनट में शुरू होगा")}`,
    "TRIGGER:-PT30M",
    "END:VALARM",
    "END:VEVENT",
  ];
}

export function buildIcsContent(event: WeddingEvent, nameHi: string, venueHi: string): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Prithviraj Palak Wedding//Invitation//HI",
    "CALSCALE:GREGORIAN",
    ...buildVeventLines(event, nameHi, venueHi, String(Date.now())),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

/** One .ics containing every event in `events` (already filtered by the
 * caller for ?events=-restricted guests) — lets a guest add the whole
 * itinerary in a single tap instead of one button per event. */
export function buildFullItineraryIcs(
  events: { event: WeddingEvent; nameHi: string; venueHi: string }[]
): string {
  const stamp = String(Date.now());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Prithviraj Palak Wedding//Invitation//HI",
    "CALSCALE:GREGORIAN",
    ...events.flatMap(({ event, nameHi, venueHi }) => buildVeventLines(event, nameHi, venueHi, stamp)),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

function downloadIcsContent(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadIcs(event: WeddingEvent, nameHi: string, venueHi: string) {
  downloadIcsContent(buildIcsContent(event, nameHi, venueHi), `${event.shortCode}-${event.key}.ics`);
}

export function downloadFullItineraryIcs(
  events: { event: WeddingEvent; nameHi: string; venueHi: string }[]
) {
  downloadIcsContent(buildFullItineraryIcs(events), "wedding-itinerary.ics");
}
