import { RootState } from "@/store"
import { setLang } from "@/store/lang.store"
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"

export default function TabTwoScreen() {
  const { lang } = useSelector((state: RootState) => state.lang)

  const dispatch = useDispatch()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.titleContainer}>Setting</Text>
      <View style={styles.cardContainer}>
        <Text>Language</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={() => dispatch(setLang("ar"))}>
            <Text style={lang === "ar" ? { color: "blue" } : {}}>AR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => dispatch(setLang("en"))}>
            <Text style={lang === "en" ? { color: "blue" } : {}}>EN</Text>
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
