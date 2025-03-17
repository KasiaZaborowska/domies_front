import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/`,
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: 'account/register',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: 'account/login',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: userCredentials,
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = accountApi;

export default accountApi;
