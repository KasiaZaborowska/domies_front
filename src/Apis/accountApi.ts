import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7098/api/',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: 'user/register',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (userCredentials) => ({
                url: 'user/login',
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
