import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const applicationApi = createApi({
    reducerPath: 'applicationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/`,
    }),
    tagTypes: ['Application'],
    endpoints: (builder) => ({
        getApplications: builder.query({
            query: () => ({
                url: 'application',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Application'],
        }),
        getApplicationById: builder.query({
            query: ({ id }) => ({
                url: `application/${id}`,
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Application'],
        }),
        updateApplication: builder.mutation({
            query: ({ data, id }) => ({
                url: `application/${id}`,
                method: 'PUT',
                body: data,
                params: {
                    id,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Application'],
        }),
        acceptApplication: builder.mutation({
            query: ({ id }) => ({
                url: `application/accept/${id}`,
                method: 'PUT',
                //body: data,
                params: {
                    id,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Application'],
        }),
        rejectApplication: builder.mutation({
            query: ({ id }) => ({
                url: `application/reject/${id}`,
                method: 'PUT',
                //body: data,
                params: {
                    id,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Application'],
        }),
        addApplication: builder.mutation({
            query: ({ data, userId }) => ({
                url: `application`,
                method: 'POST',
                body: data,
                params: {
                    userId,
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Application'],
        }),
        deleteApplication: builder.mutation({
            query: (id: number) => ({
                url: `application/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Application'],
        }),
    }),
});

export const {
    useGetApplicationsQuery,
    useGetApplicationByIdQuery,
    useAcceptApplicationMutation,
    useRejectApplicationMutation,
    useUpdateApplicationMutation,
    useAddApplicationMutation,
    useDeleteApplicationMutation,
} = applicationApi;

export default applicationApi;
