import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { animalTypeReducer } from './animalTypeSlice';
import { animalTypeApi } from '../../Apis';

const store = configureStore({
    reducer: {
        animalTypeStore: animalTypeReducer,
        [animalTypeApi.reducerPath]: animalTypeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(animalTypeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
console.log(store);
