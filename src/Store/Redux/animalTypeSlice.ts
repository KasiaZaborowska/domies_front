import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    animalType: [],
};

export const animalTypeSlice = createSlice({
    name: 'AnimalType',
    initialState: initialState,
    reducers: {
        setAnimalType: (state, action) => {
            state.animalType = action.payload;
        },
    },
});

export const { setAnimalType } = animalTypeSlice.actions;
export const animalTypeReducer = animalTypeSlice.reducer;
