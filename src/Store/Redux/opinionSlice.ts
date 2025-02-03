import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    opinions: [],
};

export const opinionSlice = createSlice({
    name: 'Opinion',
    initialState: initialState,
    reducers: {
        setOpinions: (state, action) => {
            state.opinions = action.payload;
        },
    },
});

export const { setOpinions } = opinionSlice.actions;
export const opinionReducer = opinionSlice.reducer;
