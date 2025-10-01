import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentPage: "dashboard",
  sidebarOpen: false,
}

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
  },
})

export const { setCurrentPage, toggleSidebar, setSidebarOpen } = navigationSlice.actions
export default navigationSlice.reducer
