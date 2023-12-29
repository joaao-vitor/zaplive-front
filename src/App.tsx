import CommonLayout from '@layouts/common';
import './App.css';
import { ThemeProvider } from '@components/theme-provider';
import { Toaster } from './shadcn/ui/toaster';
import { Outlet } from 'react-router-dom';

import { Provider } from 'react-redux';
import {store} from './store';

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <CommonLayout className="h-full">
                    <Outlet />
                </CommonLayout>
                <Toaster />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
