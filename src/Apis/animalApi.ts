import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const animalApi = createApi({
    reducerPath: 'animalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7098/api/',
    }),
    tagTypes: ['Animal'],
    endpoints: (builder) => ({
        getAnimals: builder.query({
            query: (userId) => ({
                url: 'animal',
                params: {
                    userId,
                },
            }),
            providesTags: ['Animal'],
        }),
        getAnimalById: builder.query({
            query: ({ userId, id }) => ({
                url: `animal/${id}`,
                params: {
                    userId,
                },
            }),
            providesTags: ['Animal'],
        }),
        updateAnimal: builder.mutation({
            query: ({ data, userId, id }) => ({
                url: `animal/${id}`,
                method: 'PATCH',
                body: data,
                params: {
                    id,
                    userId,
                },
                headers: {
                    'Accept-Encoding': 'gzip',
                },
            }),
            invalidatesTags: ['Animal'],
        }),
        addAnimal: builder.mutation({
            query: ({ data, userId }) => ({
                url: `animal`,
                method: 'POST',
                body: data,
                params: {
                    userId,
                },
                headers: {
                    'Accept-Encoding': 'gzip',
                },
            }),
            invalidatesTags: ['Animal'],
        }),
        deleteAnimal: builder.mutation({
            query: (id) => ({
                url: `animal/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Animal'],
        }),
    }),
});

export const {
    useGetAnimalsQuery,
    useGetAnimalByIdQuery,
    useUpdateAnimalMutation,
    useAddAnimalMutation,
    useDeleteAnimalMutation,
} = animalApi;

export default animalApi;
