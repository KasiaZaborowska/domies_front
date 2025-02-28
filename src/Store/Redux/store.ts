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
import { userReducer } from './userSlice';
import userApi from '../../Apis/userApi';
import { opinionReducer } from './opinionSlice';
import opinionApi from '../../Apis/opinionApi';
import { facilityReducer } from './facilitySlice';
import facilityApi from '../../Apis/facilityApi';

const store = configureStore({
    reducer: {
        animalTypeStore: animalTypeReducer,
        userAccountStore: userAccountReducer,
        offerStore: offerReducer,
        animalStore: animalReducer,
        applicationStore: applicationReducer,
        userStore: userReducer,
        opinionStore: opinionReducer,
        facilityStore: facilityReducer,
        [offerApi.reducerPath]: offerApi.reducer,
        [animalTypeApi.reducerPath]: animalTypeApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [animalApi.reducerPath]: animalApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [opinionApi.reducerPath]: opinionApi.reducer,
        [facilityApi.reducerPath]: facilityApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(animalTypeApi.middleware)
            .concat(accountApi.middleware)
            .concat(offerApi.middleware)
            .concat(animalApi.middleware)
            .concat(applicationApi.middleware)
            .concat(opinionApi.middleware)
            .concat(facilityApi.middleware)
            .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
