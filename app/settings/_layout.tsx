import { Stack, useNavigation } from "expo-router"
import React from "react"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Appbar } from "react-native-paper"

export default function Layout() {
  const colorScheme = useColorScheme()

  const nav = useNavigation()

  return (
    <>
      {/* <Appbar.Header>
        <Appbar.Action
          style={{}}
          icon="cog"
        //   onPress={() => nav.navigate("settings")}
        />
      </Appbar.Header> */}

      <Stack screenOptions={{headerShown: false}} />
    </>
  )
}
