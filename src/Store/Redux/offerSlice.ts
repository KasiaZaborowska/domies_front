import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    offer: [],
};

export const offerSlice = createSlice({
    name: 'Offer',
    initialState: initialState,
    reducers: {
        setOffers: (state, action) => {
            state.offer = action.payload;
        },
    },
});

export const { setOffers } = offerSlice.actions;
export const offerReducer = offerSlice.reducer;
