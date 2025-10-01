import { configureStore } from "@reduxjs/toolkit"
import membersReducer from "./slices/membersSlice"
import roleReducer from "./slices/roleSlice"
import themeReducer from "./slices/themeSlice" // Added theme reducer
import navigationReducer from "./slices/navigationSlice" // Added navigation reducer

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  try {
    const state = store.getState()
    localStorage.setItem("teamPulseState", JSON.stringify(state.members))
  } catch (error) {
    console.error("Error saving state to localStorage:", error)
  }
  return result
}

export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
    theme: themeReducer, // Added theme to store
    navigation: navigationReducer, // Added navigation to store
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
})
