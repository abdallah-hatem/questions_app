import type { PayloadAction } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit"

interface State {
  networkError: boolean
}

const initialState: State = {
  networkError: false,
}

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNetworkError(state, action: PayloadAction<any>) {
      state.networkError = action.payload
    },
  },
})

export const { setNetworkError } = generalSlice.actions

export default generalSlice.reducer
