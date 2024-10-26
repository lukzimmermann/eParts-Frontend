import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/auth";
import themeReduce from "@/store/theme";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReduce,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["theme/darkModeOn", "theme/darkModeOff"],
        ignoredPaths: ["theme.changeTheme"],
      },
    }),
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
