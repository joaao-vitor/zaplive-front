import CommonLayout from '@layouts/common';
import './App.css';
import { ThemeProvider } from '@components/theme-provider';
import { Toaster } from './shadcn/ui/toaster';
import { Outlet } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';

import { useGetSelfQuery } from './features/auth/authSlice';

function App() {
    const { data } = useGetSelfQuery();
    return (
        <>
            <CommonLayout className="h-full">
                <Outlet />
            </CommonLayout>
            <Toaster />
        </>
    );
}

export default App;
