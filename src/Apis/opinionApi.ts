import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const opinionApi = createApi({
    reducerPath: 'opinionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7098/api/',
    }),
    tagTypes: ['Opinion'],
    endpoints: (builder) => ({
        getOpinions: builder.query({
            query: () => ({
                url: 'opinion',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Opinion'],
        }),
        getOpinionById: builder.query({
            query: ({ id }) => ({
                url: `opinion/${id}`,
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Opinion'],
        }),
        updateOpinion: builder.mutation({
            query: ({ data, id }) => ({
                url: `opinion/${id}`,
                method: 'PUT',
                body: data,
                params: {
                    id,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Opinion'],
        }),
        addOpinion: builder.mutation({
            query: ({ data, userId }) => ({
                url: `opinion`,
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
            invalidatesTags: ['Opinion'],
        }),
        deleteOpinion: builder.mutation({
            query: (id: number) => ({
                url: `opinion/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Opinion'],
        }),
    }),
});

export const {
    useGetOpinionsQuery,
    useGetOpinionByIdQuery,
    useAddOpinionMutation,
    useDeleteOpinionMutation,
} = opinionApi;

export default opinionApi;
