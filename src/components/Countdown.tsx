"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { config, couple } from "@/content";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const target = new Date(config.shubhLagnaIso).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const { lang } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial tick for a clock synced to real time, an external system
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = lang === "hi" ? couple.countdownUnitsHi : couple.countdownUnitsEn;
  const title = lang === "hi" ? couple.countdownTitleHi : couple.countdownTitleEn;

  return (
    <div className="mt-6 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide gold-text">{title}</p>
      <div className="flex justify-center gap-3">
        {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
          <div
            key={unit}
            className="flex min-w-[64px] flex-col items-center rounded-lg border border-[var(--color-gold)]/50 bg-[var(--color-ivory)]/80 px-2 py-2 shadow-sm"
          >
            <span className="font-english text-2xl font-semibold maroon-text tabular-nums">
              {timeLeft ? String(timeLeft[unit]).padStart(2, "0") : "--"}
            </span>
            <span className="text-xs text-[var(--color-maroon)]/70">{units[unit]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
