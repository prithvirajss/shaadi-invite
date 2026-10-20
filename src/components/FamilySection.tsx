"use client";

import { useLanguage } from "@/context/LanguageContext";
import { familyGroups, familyTitle } from "@/content";
import GoldDivider from "./decor/GoldDivider";

export default function FamilySection() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  return (
    <section className="px-6 py-14" id="family">
      <h2 className={`text-center text-2xl font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
        {isHi ? familyTitle.hi : familyTitle.en}
      </h2>
      <GoldDivider className="mx-auto mt-3 mb-8 h-5 w-32 text-[var(--color-gold)]" />

      <div className="mx-auto flex max-w-md flex-col gap-5">
        {familyGroups.map((group) => (
          <div key={group.titleHi} className="rounded-xl border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] p-4 text-center">
            <h3 className={`text-sm font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
              {isHi ? group.titleHi : group.titleEn}
            </h3>
            <p className={`mt-1.5 text-sm leading-relaxed maroon-text/85 ${isHi ? "font-hindi-body" : "font-english"}`}>
              {isHi ? group.namesHi : group.namesEn}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
