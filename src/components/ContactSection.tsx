"use client";

import { useLanguage } from "@/context/LanguageContext";
import { contact, config } from "@/content";
import GoldDivider from "./decor/GoldDivider";

export default function ContactSection() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  return (
    <section className="px-6 py-14" id="contact">
      <h2 className={`text-center text-2xl font-semibold gold-text ${isHi ? "font-hindi-heading" : "font-english"}`}>
        {isHi ? contact.titleHi : contact.titleEn}
      </h2>
      <GoldDivider className="mx-auto mt-3 mb-8 h-5 w-32 text-[var(--color-gold)]" />

      <div className="mx-auto flex max-w-sm flex-col gap-3">
        <a
          href={`tel:+91${config.groomPhone}`}
          className="flex items-center justify-center gap-2 rounded-full border border-[var(--color-maroon)] px-4 py-3 text-sm font-semibold maroon-text active:scale-95"
        >
          📞 {isHi ? contact.callHi : contact.callEn}: {config.groomPhone}
        </a>
        <a
          href={`tel:+91${config.senderPhone}`}
          className="flex items-center justify-center gap-2 rounded-full border border-[var(--color-maroon)] px-4 py-3 text-sm font-semibold maroon-text active:scale-95"
        >
          📞 {isHi ? contact.callHi : contact.callEn}: {config.senderPhone}
        </a>
        <a
          href={`https://wa.me/91${config.groomPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white active:scale-95"
        >
          💬 {isHi ? contact.whatsappHi : contact.whatsappEn}
        </a>
      </div>

      <div className="mx-auto mt-8 max-w-sm text-center">
        <p className={`text-sm font-semibold gold-text ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? contact.senderHi : contact.senderEn}
        </p>
        <p className={`mt-1 text-sm maroon-text/85 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? contact.senderNameHi : contact.senderNameEn}
        </p>
        <p className={`text-sm leading-relaxed maroon-text/70 ${isHi ? "font-hindi-body" : "font-english"}`}>
          {isHi ? contact.senderAddressHi : contact.senderAddressEn}
        </p>
      </div>
    </section>
  );
}
