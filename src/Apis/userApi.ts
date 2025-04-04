import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/`,
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: 'user',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['User'],
        }),
        getUserById: builder.query({
            query: ({ email }) => ({
                url: `user/${email}`,
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['User'],
        }),
        downgradingToUserRole: builder.mutation({
            query: ({ data, email }) => ({
                url: `user/userRole/${email}`,
                method: 'PUT',
                body: data,
                params: {
                    email,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['User'],
        }),
        promotionToManagerRole: builder.mutation({
            query: ({ data, email }) => ({
                url: `user/managerRole/${email}`,
                method: 'PUT',
                body: data,
                params: {
                    email,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['User'],
        }),
        // updateUser: builder.mutation({
        //     query: ({ data, email }) => ({
        //         url: `user/${email}`,
        //         method: 'PUT',
        //         body: data,
        //         params: {
        //             email,
        //         },
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         },
        //     }),
        //     invalidatesTags: ['User'],
        // }),
        // addUser: builder.mutation({
        //     query: ({ data, userId }) => ({
        //         url: `user`,
        //         method: 'POST',
        //         body: data,
        //         params: {
        //             userId,
        //         },
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem('token')}`,
        //         },
        //     }),
        //     invalidatesTags: ['User'],
        // }),
        deleteUser: builder.mutation({
            query: (id: number) => ({
                url: `user/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useDowngradingToUserRoleMutation,
    usePromotionToManagerRoleMutation,
    // useAddUserMutation,
    // useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;

export default userApi;
