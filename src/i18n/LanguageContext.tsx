import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { pt, type Translations } from './pt';
import { en } from './en';

export type Locale = 'pt' | 'en';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const dictionaries: Record<Locale, Translations> = { pt, en };

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'pt',
  setLocale: () => {},
  t: pt,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('pa-lang');
      if (saved === 'en' || saved === 'pt') return saved;
    } catch { /* SSR safety */ }
    return 'pt';
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('pa-lang', newLocale);
    } catch { /* quota safety */ }
  };

  // Update <html lang> attribute
  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  const value: LanguageContextValue = {
    locale,
    setLocale,
    t: dictionaries[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Hook to access locale, setLocale, and the full translation object */
export function useLanguage() {
  return useContext(LanguageContext);
}

/** Shorthand hook — returns just the translation object */
export function useT() {
  return useContext(LanguageContext).t;
}
