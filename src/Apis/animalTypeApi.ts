import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const animalTypeApi = createApi({
    reducerPath: 'animalTypeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/`,
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
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            providesTags: ['AnimalTypes'],
        }),
        addAnimalType: builder.mutation({
            query: (data) => ({
                url: `animaltype`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
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
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: data,
            }),

            invalidatesTags: ['AnimalTypes'],
        }),
        deleteAnimalType: builder.mutation({
            query: (id) => ({
                url: `animaltype/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
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
