import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
	i18n.use(HttpApi)
		.use(LanguageDetector)
		.use(initReactI18next)
		.init({
			supportedLngs: ["ja", "en"],
			fallbackLng: "ja",

			detection: {
				order: ["localStorage", "navigator"],
				caches: ["localStorage"],
			},
			backend: {
				loadPath: "/locales/{{lng}}/{{ns}}.json",
				requestOptions: {
					cache: "no-store",
				},
			},

			interpolation: {
				escapeValue: false,
			},

			defaultNS: "translation",

			react: {
				useSuspense: false,
			},
		});
}

export default i18n;
