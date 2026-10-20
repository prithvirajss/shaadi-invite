"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { opening } from "@/content";
import JharokhaFrame from "./decor/JharokhaFrame";
import MandalaPattern from "./decor/MandalaPattern";
import GoldDivider from "./decor/GoldDivider";

export default function OpeningScreen({
  guestName,
  onOpened,
}: {
  guestName: string | null;
  onOpened: () => void;
}) {
  const { lang } = useLanguage();
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(onOpened, 900);
  };

  const greetingName =
    guestName?.trim() || (lang === "hi" ? opening.defaultNameHi : opening.defaultNameEn);

  return (
    <AnimatePresence>
      <motion.section
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[var(--color-maroon)]"
        animate={opened ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, delay: opened ? 0.3 : 0 }}
        style={{ pointerEvents: opened ? "none" : "auto" }}
      >
        <MandalaPattern className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)] opacity-10" />

        {/* Left door */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-[var(--color-maroon-dark)] border-r border-[var(--color-gold)]/40"
          animate={opened ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <JharokhaFrame className="absolute right-0 h-full w-full text-[var(--color-gold)] opacity-60" />
        </motion.div>

        {/* Right door */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-[var(--color-maroon-dark)] border-l border-[var(--color-gold)]/40"
          animate={opened ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <JharokhaFrame className="absolute left-0 h-full w-full scale-x-[-1] text-[var(--color-gold)] opacity-60" />
        </motion.div>

        {/* Center content */}
        <motion.button
          onClick={handleOpen}
          className="relative z-10 flex max-w-xs flex-col items-center gap-4 px-6 text-center text-[var(--color-ivory)]"
          animate={opened ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.97 }}
        >
          <p className="font-hindi-heading text-xl gold-text">{opening.ganeshVandanaHi}</p>
          <GoldDivider className="h-4 w-32 text-[var(--color-gold)]" />
          <p className="font-hindi-body whitespace-pre-line text-sm leading-relaxed text-[var(--color-ivory)]/90">
            {opening.shlokaHi}
          </p>
          <p className="mt-4 font-hindi-heading text-lg">
            {(lang === "hi" ? opening.greetingPrefixHi : opening.greetingPrefixEn) +
              " " +
              greetingName +
              (lang === "hi" ? opening.greetingSuffixHi : opening.greetingSuffixEn)}
          </p>
          <motion.span
            className="mt-3 rounded-full border border-[var(--color-gold)] px-5 py-2 text-sm font-semibold gold-text"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {lang === "hi" ? opening.tapToOpenHi : opening.tapToOpenEn}
          </motion.span>
        </motion.button>
      </motion.section>
    </AnimatePresence>
  );
}
