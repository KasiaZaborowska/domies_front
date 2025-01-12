import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    animals: [],
};

export const animalSlice = createSlice({
    name: 'Animal',
    initialState: initialState,
    reducers: {
        setAnimals: (state, action) => {
            state.animals = action.payload;
        },
    },
});

export const { setAnimals } = animalSlice.actions;
export const animalReducer = animalSlice.reducer;
