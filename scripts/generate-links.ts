/**
 * Reads guests.csv (columns: name, phone, events) and generates:
 *  - a personalized invitation link per guest (?name=...&events=...)
 *  - a WhatsApp click-to-send URL pre-filled with a greeting + the link
 *
 * CSV "events" column:
 *  - "all" (or empty) -> no ?events= param, guest sees every event
 *  - semicolon-separated short codes, e.g. "mp" or "gp;md;hl"
 *    (codes: mp=Mata Pujan, gp=Ganesh Pujan, md=Mandap, hl=Haldi,
 *     sg=Sangeet, vn=Var Nikasi, sl=Shubh Lagna, as=Ashirwad)
 *
 * Usage:
 *   npx tsx scripts/generate-links.ts [guests.csv] [https://your-site.vercel.app]
 *
 * Output: writes generated-links.csv in the project root.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

interface GuestRow {
  name: string;
  phone: string;
  events: string;
}

function parseCsv(content: string): GuestRow[] {
  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const [headerLine, ...rows] = lines;
  const headers = headerLine.split(",").map((h) => h.trim().toLowerCase());

  return rows.map((row) => {
    const cells = row.split(",").map((c) => c.trim());
    const record: Record<string, string> = {};
    headers.forEach((h, i) => {
      record[h] = cells[i] ?? "";
    });
    return {
      name: record.name ?? "",
      phone: record.phone ?? "",
      events: record.events ?? "all",
    };
  });
}

function buildLink(baseUrl: string, name: string, eventsCode: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("name", name);
  if (eventsCode && eventsCode.toLowerCase() !== "all" && eventsCode.trim() !== "") {
    const codes = eventsCode
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .join(",");
    if (codes) url.searchParams.set("events", codes);
  }
  return url.toString();
}

function buildWhatsAppUrl(phone: string, name: string, link: string): string {
  const message = `प्रिय ${name}, 🙏\n\nश्री गणेशाय नमः।\nपृथ्वीराज संग पलक के विवाह समारोह में आपका सादर निमंत्रण है। कृपया नीचे दिए लिंक पर हमारा डिजिटल निमंत्रण देखें:\n\n${link}`;
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function main() {
  const csvPath = process.argv[2] ? resolve(process.argv[2]) : resolve("guests.csv");
  const baseUrl = process.argv[3] || process.env.SITE_URL || "https://prithviraj-palak.vercel.app";

  const content = readFileSync(csvPath, "utf-8");
  const guests = parseCsv(content);

  const outputRows = ["name,phone,link,whatsapp_url"];

  for (const guest of guests) {
    if (!guest.name || !guest.phone) continue;
    const link = buildLink(baseUrl, guest.name, guest.events);
    const whatsappUrl = buildWhatsAppUrl(guest.phone, guest.name, link);
    outputRows.push(
      [guest.name, guest.phone, link, whatsappUrl].map((v) => `"${v.replace(/"/g, '""')}"`).join(",")
    );
    console.log(`${guest.name} (${guest.phone})`);
    console.log(`  Link:     ${link}`);
    console.log(`  WhatsApp: ${whatsappUrl}`);
    console.log("");
  }

  const outputPath = resolve("generated-links.csv");
  writeFileSync(outputPath, outputRows.join("\n"), "utf-8");
  console.log(`\nSaved ${guests.length} links to ${outputPath}`);
}

main();
