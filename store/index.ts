import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import rootReducer from "./rootReducer"

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["key1", "key2"], //Things you want to persist
  blacklist: ["key3", "key4"], //Things you don't want to persist
}

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)
