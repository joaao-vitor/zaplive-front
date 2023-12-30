import Navbar from '@components/Navbar';
import React from 'react';

import Sidebar from '@components/Sidebar';

interface CommonLayoutProps {
    children?: React.ReactNode;
    className?: string;
}

export default function CommonLayout({
    children,
    className,
}: CommonLayoutProps) {
    
    return (
        <main className="flex flex-col h-full">
            <Navbar />
            <div className='flex h-full'>
                <Sidebar />
                <div className="flex-grow">{children}</div>
            </div>
        </main>
    );
}
