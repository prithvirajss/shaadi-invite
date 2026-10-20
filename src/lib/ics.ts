import type { WeddingEvent } from "@/types";

function toIcsDate(iso: string): string {
  // Convert ISO (with offset) to UTC basic format YYYYMMDDTHHMMSSZ
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildIcsContent(
  event: WeddingEvent,
  nameHi: string,
  venueHi: string
): string {
  const uid = `${event.key}-${Date.now()}@prithviraj-palak-wedding`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Prithviraj Palak Wedding//Invitation//HI",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(event.startIso)}`,
    `DTEND:${toIcsDate(event.endIso)}`,
    `SUMMARY:${escapeIcsText(nameHi)}`,
    `LOCATION:${escapeIcsText(venueHi)}`,
    `DESCRIPTION:${escapeIcsText(nameHi + " — पृथ्वीराज संग पलक विवाह समारोह")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(event: WeddingEvent, nameHi: string, venueHi: string) {
  const content = buildIcsContent(event, nameHi, venueHi);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.shortCode}-${event.key}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
