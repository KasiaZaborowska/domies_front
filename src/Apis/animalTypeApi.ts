import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buffer } from 'stream/consumers';

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
    }),
});

export const { useGetAnimalTypesQuery, useGetAnimalTypeByIdQuery } =
    animalTypeApi;

export default animalTypeApi;
