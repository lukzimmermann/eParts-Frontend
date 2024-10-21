import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import themeReduce from './theme'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReduce,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['theme/darkModeOn', 'theme/darkModeOff'],
        ignoredPaths: ['theme.changeTheme'],
      },
    }),
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;