import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const animalTypeApi = createApi({
    reducerPath: 'animalTypeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7098/api/',
    }),
    tagTypes: ['AnimalTypes'],
    endpoints: (builder) => ({
        getAnimalTypes: builder.query({
            query: () => ({
                url: 'animaltype',
            }),
            providesTags: ['AnimalTypes'],
        }),
        getAnimalTypeById: builder.query({
            query: (id) => ({
                url: `animaltype/${id}`,
            }),
            providesTags: ['AnimalTypes'],
        }),
        addAnimalType: builder.mutation({
            query: (data) => ({
                url: `animaltype`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['AnimalTypes'],
        }),
        updateAnimalType: builder.mutation({
            query: ({ data, id }) => ({
                url: `animaltype/${id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }),

            invalidatesTags: ['AnimalTypes'],
        }),
        deleteAnimalType: builder.mutation({
            query: (id) => ({
                url: `animaltype/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AnimalTypes'],
        }),
    }),
});

export const {
    useGetAnimalTypesQuery,
    useGetAnimalTypeByIdQuery,
    useAddAnimalTypeMutation,
    useUpdateAnimalTypeMutation,
    useDeleteAnimalTypeMutation,
} = animalTypeApi;

export default animalTypeApi;
