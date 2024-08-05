import { RootState } from "@/store"
import { setLang } from "@/store/lang.store"
import { useTranslation } from "react-i18next"
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import "@/i18"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function TabTwoScreen() {
  const { lang } = useSelector((state: RootState) => state.lang)
  const { t, i18n } = useTranslation()

  const dispatch = useDispatch()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.titleContainer}>{t("settings")}</Text>
      <View style={styles.cardContainer}>
        <Text>{t("language")}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setLang("ar"))
              i18n.changeLanguage("ar")
            }}
          >
            <Text
              style={{ color: lang === "ar" ? "orange" : "gray", fontSize: 16 }}
            >
              AR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              dispatch(setLang("en"))
              i18n.changeLanguage("en")
            }}
          >
            <Text
              style={{ color: lang === "en" ? "orange" : "gray", fontSize: 16 }}
            >
              EN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 28,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: "#f8f9fa",
  },
})
