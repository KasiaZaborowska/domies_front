import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { animalTypeReducer } from './animalTypeSlice';
import { accountApi, animalTypeApi } from '../../Apis';
import { userAccountReducer } from './userAccountSlice';

const store = configureStore({
    reducer: {
        animalTypeStore: animalTypeReducer,
        userAccountStore: userAccountReducer,
        [animalTypeApi.reducerPath]: animalTypeApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(animalTypeApi.middleware)
            .concat(accountApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
