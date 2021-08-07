import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { userSlice } from './userSlice';
import { roleSlice } from './roleSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    role: roleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
