import { configureStore } from '@reduxjs/toolkit';
import { animalTypeReducer } from './animalTypeSlice';
import {
    accountApi,
    animalApi,
    animalTypeApi,
    offerApi,
    applicationApi,
} from '../../Apis';
import { userAccountReducer } from './userAccountSlice';
import { offerReducer } from './offerSlice';
import { animalReducer } from './animalSlice';
import { applicationReducer } from './applicationSlice';

const store = configureStore({
    reducer: {
        animalTypeStore: animalTypeReducer,
        userAccountStore: userAccountReducer,
        offerStore: offerReducer,
        animalStore: animalReducer,
        applicationStore: applicationReducer,
        [offerApi.reducerPath]: offerApi.reducer,
        [animalTypeApi.reducerPath]: animalTypeApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [animalApi.reducerPath]: animalApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(animalTypeApi.middleware)
            .concat(accountApi.middleware)
            .concat(offerApi.middleware)
            .concat(animalApi.middleware)
            .concat(applicationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
