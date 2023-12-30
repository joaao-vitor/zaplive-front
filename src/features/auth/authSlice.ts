import { apiSlice } from '../api/apiSlice';

import { createEntityAdapter } from '@reduxjs/toolkit';

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState();

interface ResponseMe {
    code: number;
    user: {
        id: number;
        username: string;
        imageUrl: string;
    };
}

interface SignInUser {
    email: string;
    password: string;
    rememberme?: boolean | undefined;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSelf: builder.query<ResponseMe, void>({
            query: () => 'user/me',
            providesTags: (result, error, arg) => [{ type: 'USERS', id: 'ME' }],
        }),
        signIn: builder.mutation<ResponseMe, SignInUser>({
            query: (user) => ({
                url: 'auth/sign-in',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['USERS'],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({ url: 'auth/logout', method: 'DELETE' }),
            invalidatesTags: ['USERS'],
        }),
    }),
});

export const { useGetSelfQuery, useSignInMutation, useLogoutMutation } =
    authApiSlice;
