import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkStateOfAuthentication = createAsyncThunk(
  'auth/requestStatus',
  async (): Promise<any> => {
    let token = await AsyncStorage.getItem('access_token');
    if (token) return true;
    return false;
  },
);
interface AuthState {
  authenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.authenticated = action.payload;
    },
  },
  extraReducers: {
    [checkStateOfAuthentication.pending.toString()]: (state, action) => {
      state.authenticated = action.payload;
      state.loading = true;
    },
    [checkStateOfAuthentication.fulfilled.toString()]: (state, action) => {
      state.authenticated = action.payload;
      state.loading = false;
    },
    [checkStateOfAuthentication.rejected.toString()]: (state, action) => {
      state.authenticated = false;
      state.loading = false;
    },
  },
});

const { actions } = authSlice;

export const { setLoginState } = actions;

export default authSlice.reducer;
