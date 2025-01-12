import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { animalTypeReducer } from './animalTypeSlice';
import { accountApi, animalApi, animalTypeApi, offerApi } from '../../Apis';
import { userAccountReducer } from './userAccountSlice';
import { offerReducer } from './offerSlice';
import { animalReducer } from './animalSlice';

const store = configureStore({
    reducer: {
        animalTypeStore: animalTypeReducer,
        userAccountStore: userAccountReducer,
        offerStore: offerReducer,
        animalStore: animalReducer,
        [offerApi.reducerPath]: offerApi.reducer,
        [animalTypeApi.reducerPath]: animalTypeApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [animalApi.reducerPath]: animalApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(animalTypeApi.middleware)
            .concat(accountApi.middleware)
            .concat(offerApi.middleware)
            .concat(animalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
