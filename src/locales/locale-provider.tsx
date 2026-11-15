"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { messages, type Locale } from "@/locales/messages";

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = "aeron-locale";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("aeron-locale-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("aeron-locale-change", onChange);
  };
}

function getSnapshot(): Locale {
  const saved = window.localStorage.getItem(storageKey);
  return saved === "ru" || saved === "en" ? saved : "kk";
}

const getServerSnapshot = (): Locale => "kk";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = useCallback((nextLocale: Locale) => {
    window.localStorage.setItem(storageKey, nextLocale);
    window.dispatchEvent(new Event("aeron-locale-change"));
  }, []);

  useEffect(() => {
    const copy = messages[locale];
    document.documentElement.lang = locale;
    document.title = copy.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta.description);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return { ...context, copy: messages[context.locale] };
}
