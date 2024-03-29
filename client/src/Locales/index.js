import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from "./tr.json"
import en from "./en.json"

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({

        resources: {
            en: {
                translation: en
            },
            tr: {
                translation: tr
            }
        },
        fallbackLng: navigator.language,

        interpolation: {
            escapeValue: false
        }
    });
