// Trimmed copy of the main site's event list — only what the admin
// dashboard needs (key + display names) for per-event headcounts.
// Keep this in sync with the `events` array in the main app's
// `src/content.ts` if event names/keys ever change there.

export interface EventLabel {
  key: string;
  nameHi: string;
  nameEn: string;
}

export const events: EventLabel[] = [
  { key: "mataPujan", nameHi: "माता पूजन", nameEn: "Mata Pujan" },
  { key: "ganeshPujan", nameHi: "श्री गणेश पूजन", nameEn: "Shri Ganesh Pujan" },
  { key: "mandap", nameHi: "मण्डप", nameEn: "Mandap" },
  { key: "haldi", nameHi: "हल्दी कार्निवाल", nameEn: "Haldi Carnival" },
  { key: "sangeet", nameHi: "महिला संगीत", nameEn: "Mahila Sangeet" },
  { key: "varNikasi", nameHi: "वर निकासी", nameEn: "Var Nikasi" },
  { key: "shubhLagna", nameHi: "शुभ लग्न", nameEn: "Shubh Lagna" },
  { key: "ashirwad", nameHi: "आशीर्वाद समारोह एवं स्वरुचि भोज", nameEn: "Ashirwad Ceremony & Dinner" },
];
