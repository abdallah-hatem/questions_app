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
import { RootState } from "@/store"
import { Button } from "react-native-paper"
import { EvilIcons } from "@expo/vector-icons"

interface Question {
  category: string
  QuestionText: string
  QuestionTextEn: string
  Active: boolean
  Rank: number
}

const QuestionCard: React.FC<Question> = ({ QuestionTextEn, QuestionText }) => {
  const { lang } = useSelector((state: RootState) => state.lang)

  return (
    <View style={styles.cardContainer}>
      {/* <Text style={styles.categoryText}>{category}</Text> */}
      <Text style={styles.questionText}>
        {lang === "en" ? QuestionTextEn : QuestionText}
      </Text>
    </View>
  )
}

const HomeScreen: React.FC = () => {
  const [cardData, setCardData] = useState<Question>()
  const [loading, setLoading] = useState<boolean>(false)

  console.log(cardData)

  const getData = () => {
    setLoading(true)
    GET_RANDOM_QUESTION()
      .then((data: any) => setCardData(data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [])

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

      <TouchableOpacity onPress={getData} style={styles.suffleBtn}>
        {!loading ? (
          <Text style={styles.suffleBtnText}>Shuffle</Text>
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
    backgroundColor: "#f8f9fa",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    minHeight: Dimensions.get("window").height * 0.65,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  questionText: {
    fontSize: 16,
  },
  suffleBtn: {
    margin: 20,
    // padding: 10,
    borderRadius: 50,
    backgroundColor: "orange",
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
