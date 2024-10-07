// src/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state type
interface AuthState {
  isLoggedIn: boolean;
}

// Define the initial state
const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Export the actions
export const { logIn, logOut } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;