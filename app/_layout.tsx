import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/useColorScheme"
import { Provider } from "react-redux"
import { persistor, store } from "@/store"
import { PersistGate } from "redux-persist/integration/react"
import {
  MD3LightTheme as PaperDefaultTheme,
  PaperProvider,
} from "react-native-paper"

import "@/i18"
import { useTranslation } from "react-i18next"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })
  const { t } = useTranslation()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  const theme = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: "orange",
      secondary: "white",
    },
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="settings"
                options={{
                  headerShown: true,
                  headerBackTitle: t("home"),
                  headerStyle: { backgroundColor: "white" },
                  headerTitle: "",
                }}
              />
            </Stack>
          </ThemeProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}
