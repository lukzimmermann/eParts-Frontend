// src/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/models/user";
import { apiCall, Method } from "@/utils/apiCall";

interface AuthState {
  isLoggedIn: boolean;
  user: User;
}

const response = await apiCall<any>(Method.GET, "auth/", null);

const initialState: AuthState = {
  isLoggedIn: response.data ? true : false,
  user: response.data ? response.data : undefined,
};

const authSlice = createSlice({
  name: "auth",
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
