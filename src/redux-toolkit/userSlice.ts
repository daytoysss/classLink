import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface UserState {
    info: any;
}

const initialState: UserState = {
    info: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.info = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
