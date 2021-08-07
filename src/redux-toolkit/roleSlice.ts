import { createSlice } from '@reduxjs/toolkit';

interface RoleState {
    role: string;
}

const initialState: RoleState = {
    role: 'teacher',
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
