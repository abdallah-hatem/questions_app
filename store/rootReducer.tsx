import { combineReducers } from "@reduxjs/toolkit"

import langReducer from "./lang.store"

const rootReducer = combineReducers({
  lang: langReducer,
})

export default rootReducer
