import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import sr from "./locales/sr.json";

// Import translation files



i18n
  .use(LanguageDetector) // Detect user language (from browser or manually set)
  .use(initReactI18next) // Bind i18n to React
  .init({
    resources: {
      en: { translation: en },
      sr: { translation: sr },
    },
    fallbackLng: "sr", // Default language if translation is missing
    detection: {
      order: ["queryString", "localStorage", "navigator"],
      caches: ["localStorage"], // Cache language preference
    },
    interpolation: {
      escapeValue: false, // React already escapes strings
    },
  });

export default i18n;
