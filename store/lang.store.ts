import type { PayloadAction } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit"

interface LangState {
  lang: "en" | "ar"
}

const initialState: LangState = {
  lang: "en",
}

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<any>) {
      state.lang = action.payload
    },
  },
})

export const { setLang } = langSlice.actions

export default langSlice.reducer
