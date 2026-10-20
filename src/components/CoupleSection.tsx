"use client";

import { useLanguage } from "@/context/LanguageContext";
import { couple } from "@/content";
import GoldDivider from "./decor/GoldDivider";
import PaisleyBorder from "./decor/PaisleyBorder";
import Countdown from "./Countdown";

export default function CoupleSection() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  return (
    <section className="relative px-6 py-14 text-center">
      <PaisleyBorder className="mx-auto mb-6 h-6 w-48 text-[var(--color-gold)]" />
      <p className={`mx-auto max-w-sm text-sm leading-relaxed maroon-text/90 ${isHi ? "font-hindi-body" : "font-english"}`}>
        {isHi ? couple.blessingLineHi : couple.blessingLineEn}
      </p>

      <div className="mx-auto mt-8 max-w-sm">
        <h2 className={`text-2xl font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
          {isHi ? couple.groom.nameHi : couple.groom.nameEn}
        </h2>
        <p className={`mt-2 text-sm maroon-text/80 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? couple.groom.grandsonOfHi : couple.groom.grandsonOfEn}
        </p>
        <p className={`text-sm maroon-text/80 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? couple.groom.sonOfHi : couple.groom.sonOfEn}
        </p>
      </div>

      <div className="my-6 flex items-center justify-center gap-3">
        <GoldDivider className="h-5 w-24 text-[var(--color-gold)]" />
        <span className={`text-lg maroon-text ${isHi ? "font-hindi-heading" : "font-english italic"}`}>
          {isHi ? couple.sangHi : couple.sangEn}
        </span>
        <GoldDivider className="h-5 w-24 text-[var(--color-gold)]" />
      </div>

      <div className="mx-auto max-w-sm">
        <h2 className={`text-2xl font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
          {isHi ? couple.bride.nameHi : couple.bride.nameEn}
        </h2>
        <p className={`mt-2 text-sm maroon-text/80 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? couple.bride.granddaughterOfHi : couple.bride.granddaughterOfEn}
        </p>
        <p className={`text-sm maroon-text/80 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? couple.bride.daughterOfHi : couple.bride.daughterOfEn}
        </p>
      </div>

      <Countdown />
      <PaisleyBorder className="mx-auto mt-10 h-6 w-48 scale-y-[-1] text-[var(--color-gold)]" />
    </section>
  );
}
