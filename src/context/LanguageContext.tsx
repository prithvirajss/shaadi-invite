"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/types";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "wedding-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always starts as "hi" on both server and client to avoid a hydration
  // mismatch; the stored preference (if any) is applied right after mount.
  const [lang, setLangState] = useState<Lang>("hi");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "hi" || stored === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage, an external system, right after mount
        setLangState(stored);
      }
    } catch {
      // ignore (e.g. private browsing mode)
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "hi" ? "en" : "hi");
  }, [lang, setLang]);

  const value = useMemo(() => ({ lang, toggleLang, setLang }), [lang, toggleLang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
