import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const animalApi = createApi({
    reducerPath: 'animalApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7098/api/',
    }),
    tagTypes: ['Animal'],
    endpoints: (builder) => ({
        getAnimals: builder.query({
            query: () => ({
                url: 'animal',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Animal'],
        }),
        getAnimalById: builder.query({
            query: ({ id }) => ({
                url: `animal/${id}`,
                params: {},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['Animal'],
        }),
        updateAnimal: builder.mutation({
            query: ({ data, id }) => ({
                url: `animal/${id}`,
                method: 'PUT',
                body: data,
                params: {
                    id,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Animal'],
        }),
        deleteAnimal: builder.mutation({
            query: (id) => ({
                url: `animal/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
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
