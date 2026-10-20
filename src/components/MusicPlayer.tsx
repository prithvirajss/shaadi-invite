"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/content";
import { withBasePath } from "@/lib/basePath";

export default function MusicPlayer() {
  const { lang } = useLanguage();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(withBasePath("/audio/shehnai.mp3"));
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {
        // Autoplay / missing file — fail silently
      });
      setPlaying(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? (lang === "hi" ? ui.musicOffHi : ui.musicOffEn) : lang === "hi" ? ui.musicOnHi : ui.musicOnEn}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-maroon)] text-[var(--color-gold-light)] shadow-lg ring-2 ring-[var(--color-gold)] transition active:scale-90"
    >
      {playing ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
