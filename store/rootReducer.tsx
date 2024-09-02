import { combineReducers } from "@reduxjs/toolkit"

import langReducer from "./lang.store"
import generalReducer from "./general.store"

const rootReducer = combineReducers({
  lang: langReducer,
  general: generalReducer,
})

export default rootReducer
