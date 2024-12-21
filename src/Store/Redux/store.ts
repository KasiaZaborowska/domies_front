import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { animalTypeReducer } from './animalTypeSlice';
import { accountApi, animalTypeApi, offerApi } from '../../Apis';
import { userAccountReducer } from './userAccountSlice';
import { offerReducer } from './offerSlice';

const store = configureStore({
    reducer: {
        animalTypeStore: animalTypeReducer,
        userAccountStore: userAccountReducer,
        offerStore: offerReducer,
        [offerApi.reducerPath]: offerApi.reducer,
        [animalTypeApi.reducerPath]: animalTypeApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(animalTypeApi.middleware)
            .concat(accountApi.middleware)
            .concat(offerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
