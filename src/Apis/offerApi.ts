import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const offerApi = createApi({
    reducerPath: 'offerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/`,
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
            query: ({ data, userId, id }) => ({
                url: `offer/${id}`,
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
                    'Accept-Encoding': 'gzip',
                },
            }),
            invalidatesTags: ['Offer'],
        }),
        deleteOffer: builder.mutation({
            query: (id) => ({
                url: `offer/${id}`,
                method: 'DELETE',
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
    useDeleteOfferMutation,
} = offerApi;

export default offerApi;
