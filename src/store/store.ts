import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import themeReduce from './theme'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReduce,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;