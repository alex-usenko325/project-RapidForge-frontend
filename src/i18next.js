import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import enTranslation from './locales/en/translation.json';  // для англійської
import uaTranslation from './locales/ua/translation.json'; 
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    resources: {
        en: { translation: enTranslation },
        ua: { translation: uaTranslation },
    },
    lng: "en",
    fallbackLng: "en", 
    debug: false,
    interpolation: {
        escapeValue: false,
    }
  });

  export default i18next;