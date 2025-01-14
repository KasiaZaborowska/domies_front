import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applications: [],
};

export const applicationSlice = createSlice({
    name: 'Application',
    initialState: initialState,
    reducers: {
        setApplications: (state, action) => {
            state.applications = action.payload;
        },
    },
});

export const { setApplications } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
