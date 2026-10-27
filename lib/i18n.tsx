'use client';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import en, { type Dict } from '@/content/en';
import si from '@/content/si';

// Adding Tamil later = create content/ta.ts and add it here.
export const dictionaries = { en, si } as const;
export type Lang = keyof typeof dictionaries;

const KEY = 'cth-lang';
const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({
  lang: 'en',
  t: en,
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved && saved in dictionaries) setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  return <Ctx.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
