import { createSlice } from '@reduxjs/toolkit';
import { userAccountInterface } from '../../Interfaces';

export const emptyUserState: userAccountInterface = {
    Email: '',
    FirstName: '',
    LastName: '',
    Password: '',
    Role: '',
};

export const userAccountSlice = createSlice({
    name: 'userAccount',
    initialState: emptyUserState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.Email = action.payload.Email;
            state.FirstName = action.payload.FirstName;
            state.LastName = action.payload.LastName;
            state.Role = action.payload.Role;
        },
    },
});

export const { setLoggedInUser } = userAccountSlice.actions;
export const userAccountReducer = userAccountSlice.reducer;
