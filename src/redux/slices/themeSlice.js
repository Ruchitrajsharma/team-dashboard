import { createSlice } from "@reduxjs/toolkit"

const loadThemeFromStorage = () => {
  try {
    const savedTheme = localStorage.getItem("teamPulseTheme")
    return savedTheme || "light"
  } catch (error) {
    console.error("Error loading theme from localStorage:", error)
    return "light"
  }
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: loadThemeFromStorage(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
      try {
        localStorage.setItem("teamPulseTheme", state.mode)
        // Apply theme to document
        if (state.mode === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      } catch (error) {
        console.error("Error saving theme to localStorage:", error)
      }
    },
    initializeTheme: (state) => {
      // Apply saved theme on app initialization
      if (state.mode === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    },
  },
})

export const { toggleTheme, initializeTheme } = themeSlice.actions
export default themeSlice.reducer
