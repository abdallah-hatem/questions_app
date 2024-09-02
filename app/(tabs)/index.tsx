import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { GET_RANDOM_QUESTION } from "@/api/events"
import { useSelector } from "react-redux"
import { dispatch, RootState } from "@/store"
import { useTranslation } from "react-i18next"
import { Colors } from "@/constants/Colors"
import useFetch from "@/hooks/useFetch"
import { setNetworkError } from "@/store/general.store"
import useModal from "@/hooks/useModal"

type Category = {
  categoryNameEn: string
  categoryName: string
  active: boolean
  color: string
}

interface Question {
  // category: string
  questionText: string
  questionTextEn: string
  active: boolean
  Rank: number
  category: Category
}

const QuestionCard: React.FC<Question> = ({
  questionTextEn = "Loading...",
  questionText = "تحميل...",
  category,
}) => {
  const { lang } = useSelector((state: RootState) => state.lang)

  const { categoryName, categoryNameEn } = category ?? {}

  console.log(categoryName, "categoryName")

  return (
    <View style={styles.cardContainer}>
      {/* <Text style={styles.categoryText}>{category}</Text> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.catTextCont}>
          <Text style={styles.catText}>
            {lang === "en"
              ? categoryNameEn ?? "Loading..."
              : categoryName ?? "تحميل..."}
          </Text>
        </View>

        <Text style={styles.questionText}>
          {lang === "en" ? questionTextEn : questionText}
        </Text>
      </View>
    </View>
  )
}

const HomeScreen: React.FC = () => {
  const { t, i18n } = useTranslation()

  const {
    data: cardData,
    refetch,
    loading,
    error,
  } = useFetch<Question>({
    GET: GET_RANDOM_QUESTION,
  })

  const { renderModal } = useModal({ networkError: error, onRefresh: refetch })

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar style="dark" />

      <FlatList
        data={[cardData]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: any) => <QuestionCard {...item} />}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
        }}
      />

      <TouchableOpacity onPress={refetch} style={styles.suffleBtn}>
        {!loading ? (
          <Text style={styles.suffleBtnText}>{t("shuffle")}</Text>
        ) : (
          <>
            <ActivityIndicator
              style={{
                height: "100%",
                width: "100%",
              }}
              size="large"
              color="white"
            />
          </>
        )}
      </TouchableOpacity>

      {renderModal()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 20,
  },
  cardContainer: {
    // backgroundColor: "orange",
    backgroundColor: "#ebeff5",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    height: Dimensions.get("window").height * 0.65,
    maxHeight: 600,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  questionText: {
    fontSize: 16,
  },
  catTextCont: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  catText: { fontSize: 16, fontWeight: "bold", textTransform: "uppercase" },
  suffleBtn: {
    margin: 20,
    // padding: 10,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    width: 100,
    height: 100,
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    display: "flex",
    justifyContent: "center",
  },
  suffleBtnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
})

export default HomeScreen
