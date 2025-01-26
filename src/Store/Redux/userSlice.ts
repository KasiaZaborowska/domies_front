import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

export const userSlice = createSlice({
    name: 'User',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { setUsers } = userSlice.actions;
export const userReducer = userSlice.reducer;
