"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/content";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  return (
    <button
      onClick={toggleLang}
      className="rounded-full border border-[var(--color-gold)] bg-[var(--color-ivory)]/90 px-3 py-1.5 text-sm font-semibold maroon-text shadow-sm transition active:scale-95"
      aria-label="Toggle language"
    >
      {lang === "hi" ? ui.langToggleHi : ui.langToggleEn}
    </button>
  );
}
