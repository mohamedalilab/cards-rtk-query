import { createSlice } from "@reduxjs/toolkit";

// define key in localStorage name
const themeKey = "redux-theme";

// get value of theme in localStorage if exist
const getInitialTheme = () => {
  const theme = localStorage.getItem(themeKey);
  // return saved value if exists, otherwise default to light
  return theme ? theme : "light";
};

const initialState = {
  darkMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // toggle theme with save update in localStorage
    toggleTheme(state) {
      // define newTheme to stop repeat condition return
      state.darkMode = state.darkMode === "dark" ? "light" : "dark";
    },
  },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
export const selectDarkMode = (state) => state.theme.darkMode;
