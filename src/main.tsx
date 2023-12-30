import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@pages/home';
import VerifyEmail from '@pages/user/verify-email';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { ThemeProvider } from '@components/theme-provider.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/user/',
                children: [
                    {
                        path: 'verify-email',
                        element: <VerifyEmail />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
