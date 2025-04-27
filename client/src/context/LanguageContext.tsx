import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import i18n from "../lib/i18n";
import { LanguageContextType } from "../lib/types";

// Create language context
const LanguageContext = createContext<LanguageContextType>({
  language: "ru",
  changeLanguage: () => {}
});

// Hook for using language context
export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "ru";
  });

  // Change language function
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("language", lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  // Set the language on initial load
  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  const value = {
    language,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
