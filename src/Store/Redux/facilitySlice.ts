import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    facilities: [],
};

export const facilitySlice = createSlice({
    name: 'Facility',
    initialState: initialState,
    reducers: {
        setFacility: (state, action) => {
            state.facilities = action.payload;
        },
    },
});

export const { setFacility } = facilitySlice.actions;
export const facilityReducer = facilitySlice.reducer;
