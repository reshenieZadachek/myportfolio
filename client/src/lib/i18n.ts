import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../data/en.json";
import ruTranslation from "../data/ru.json";

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ru: {
        translation: ruTranslation
      }
    },
    lng: "ru", // Default language is now Russian
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;
