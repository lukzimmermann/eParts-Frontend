import { createSlice } from "@reduxjs/toolkit";
interface Theme {
    isDarkMode: boolean;
}

const initialState: Theme = {
    isDarkMode: true,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        darkModeOn: (state) => {
            state.isDarkMode = true;
        },
        darkModeOff: (state) => {
            state.isDarkMode = false;
        }
    }
})

export const {darkModeOn, darkModeOff} = themeSlice.actions

export default themeSlice.reducer