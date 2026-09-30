import { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations, getTranslation } from '../utils/translations';

const STORAGE_KEY = 'visionai_language';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === 'uz' || saved === 'ru' || saved === 'en') {
      return saved;
    }
    return 'uz'; // Default to Uzbek as specified
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = getTranslation(language);

  return {
    language,
    setLanguage,
    t,
  };
}
