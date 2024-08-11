import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import * as Localization from "expo-localization"
import { default as en } from "@/utils/lang/EN"
import { default as ar } from "@/utils/lang/AR"
import AsyncStorage from "@react-native-async-storage/async-storage"

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
}

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language")

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode ?? "en"
  }

  i18n.use(initReactI18next).init({
    lng: savedLanguage,
    resources,
    compatibilityJSON: "v3",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
}

initI18n()

export default i18n
