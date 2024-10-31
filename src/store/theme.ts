import { createSlice } from "@reduxjs/toolkit";
interface Theme {
  isDarkMode: boolean;
}

const getInitialThemeMode = (): boolean => {
  const storedMode = localStorage.getItem("isDarkMode");
  if (storedMode === null) {
    return false;
  }
  return storedMode === "true";
};

const initialState: Theme = {
  isDarkMode: getInitialThemeMode(),
};

const setDarkMode = (state, action) => {
  state.isDarkMode = true;
  localStorage.setItem("isDarkMode", "true");
  action.payload.changeTheme("/themes/lara-light/theme.css", "/themes/lara-dark/theme.css", "theme-link");
};

const setLightMode = (state, action) => {
  state.isDarkMode = false;
  localStorage.setItem("isDarkMode", "false");
  action.payload.changeTheme("/themes/lara-dark/theme.css", "/themes/lara-light/theme.css", "theme-link");
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkModeOn: (state, action) => {
      setDarkMode(state, action);
    },
    darkModeOff: (state, action) => {
      setLightMode(state, action);
    },
    toggleDarkMode: (state, action) => {
      if (state.isDarkMode) {
        setLightMode(state, action);
      } else {
        setDarkMode(state, action);
      }
    },
  },
});

export const { darkModeOn, darkModeOff, toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
