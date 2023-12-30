import { configureStore } from '@reduxjs/toolkit';
import signSlice from './features/signDialog/signSlice';
import { apiSlice } from './features/api/apiSlice';
import sideBarSlice from './features/Sidebar/SidebarSlice';
export const store = configureStore({
    reducer: {
        sign: signSlice,
        sideBar: sideBarSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
