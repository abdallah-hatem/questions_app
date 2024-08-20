import { RootState } from "@/store";
import { setLang } from "@/store/lang.store";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";

export default function Settings() {
  const { lang } = useSelector((state: RootState) => state.lang);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  console.log(currentLanguage, "currentLanguage");

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.titleContainer}>{t("settings")}</Text>
      <View style={styles.cardContainer}>
        <Text>{t("language")}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              changeLanguage("ar");
              dispatch(setLang("ar"));
            }}
          >
            <Text
              style={{
                color: lang === "ar" ? Colors.primary : "gray",
                fontSize: 16,
              }}
            >
              AR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              changeLanguage("en");
              dispatch(setLang("en"));
            }}
          >
            <Text
              style={{
                color: lang === "en" ? Colors.primary : "gray",
                fontSize: 16,
              }}
            >
              EN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
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
});
