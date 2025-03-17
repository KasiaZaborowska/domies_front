import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const facilityApi = createApi({
    reducerPath: 'facilityApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/`,
    }),
    tagTypes: ['Facility'],
    endpoints: (builder) => ({
        getFacilities: builder.query({
            query: () => ({
                url: 'facility',
            }),
            providesTags: ['Facility'],
        }),
        getFacilityById: builder.query({
            query: (id) => ({
                url: `facility/${id}`,
            }),
            providesTags: ['Facility'],
        }),
    }),
});

export const { useGetFacilitiesQuery, useGetFacilityByIdQuery } = facilityApi;

export default facilityApi;
