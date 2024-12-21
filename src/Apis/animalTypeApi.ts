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
            query: (newType: { Type: string }) => ({
                url: `animaltype`,
                method: 'POST',
                // params: {
                //     userId,
                // },
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newType),
            }),
            invalidatesTags: ['AnimalTypes'],
        }),
    }),
});

export const {
    useGetAnimalTypesQuery,
    useGetAnimalTypeByIdQuery,
    useAddAnimalTypeMutation,
} = animalTypeApi;

export default animalTypeApi;
