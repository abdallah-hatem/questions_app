import { StyleSheet, SafeAreaView, Text } from "react-native"

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.titleContainer}>second page</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 28,
  },
})
