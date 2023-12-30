import { User } from '@/@types/User';
import { apiSlice } from '../api/apiSlice';

interface ResponseRecommended {
    code: number;
    users: User[];
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecommended: builder.query<ResponseRecommended, void>({
            query: () => 'user/recommended',
            providesTags: () => [{ type: 'USERS', id: 'RECOMMENDED' }],
        }),
    }),
});

export const { useGetRecommendedQuery } = userApiSlice;
