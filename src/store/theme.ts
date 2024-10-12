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
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        darkModeOn: (state, action) => {
          state.isDarkMode = true;
          localStorage.setItem("isDarkMode", "true");
          action.payload.changeTheme(
            "/themes/lara-light/theme.css",
            "/themes/lara-dark/theme.css",
            "theme-link"
          );
        },
        darkModeOff: (state, action) => {
          state.isDarkMode = false;
          localStorage.setItem("isDarkMode", "false");
          action.payload.changeTheme(
            "/themes/lara-dark/theme.css",
            "/themes/lara-light/theme.css",
            "theme-link"
          );
        },
        toggleDarkMode: (state, action) => {
            state.isDarkMode = !state.isDarkMode;
            if(state.isDarkMode){
                localStorage.setItem("isDarkMode", "true");
                action.payload.changeTheme(
                    "/themes/lara-light/theme.css",
                    "/themes/lara-dark/theme.css",
                    "theme-link"
                  );
            }else{
                localStorage.setItem("isDarkMode", "false");
                action.payload.changeTheme(
                    "/themes/lara-dark/theme.css",
                    "/themes/lara-light/theme.css",
                    "theme-link"
                  );
            }
            
        },
      },
})

export const {darkModeOn, darkModeOff, toggleDarkMode} = themeSlice.actions

export default themeSlice.reducer