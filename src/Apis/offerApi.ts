import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const offerApi = createApi({
    reducerPath: 'offerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7098/api/',
    }),
    tagTypes: ['Offer'],
    endpoints: (builder) => ({
        getOffers: builder.query({
            query: (userId) => ({
                url: 'offer',
                params: {
                    userId,
                },
            }),
            providesTags: ['Offer'],
        }),
        getOfferById: builder.query({
            query: ({ userId, id }) => ({
                url: `offer/${id}`,
                params: {
                    userId,
                },
            }),
            providesTags: ['Offer'],
        }),
        updateOffer: builder.mutation({
            query: ({ userId, id }) => ({
                url: `offer/${id}`,
                method: 'PATCH',
                params: {
                    id,
                    userId,
                },
            }),
            invalidatesTags: ['Offer'],
        }),
        addOffer: builder.mutation({
            query: ({ data, userId }) => ({
                url: `offer`,
                method: 'POST',
                body: data,
                params: {
                    userId,
                },
                headers: {
                    'Content-Type': 'application/json', // Wysyłamy JSON
                },
            }),
            invalidatesTags: ['Offer'],
        }),
    }),
});

export const {
    useGetOffersQuery,
    useGetOfferByIdQuery,
    useUpdateOfferMutation,
    useAddOfferMutation,
} = offerApi;

export default offerApi;
