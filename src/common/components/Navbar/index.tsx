import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Logo from './logo.jpg';
import { Button } from '@/shadcn/ui/button';
import { Input } from '@/shadcn/ui/input';
import { Switch } from '@/shadcn/ui/switch';
import { useTheme } from '@components/theme-provider';
import SignInDialog from '@components/Navbar/Sign';

export default function Navbar() {
    const [darkMoke, setDarkMode] = useState(true);
    const [search, setSearch] = useState('');
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else setTheme('light');

        setDarkMode((state) => !state);
    };

    return (
        <nav className="flex justify-between gap-x-2 py-4 bg-neutral-300 dark:bg-neutral-800 px-4 lg:px-8">
            <div className="flex items-center text-primary justify-center">
                <img src={Logo} className="w-10 lg:w-12 rounded-full" />
                <div className="ml-4 lg:flex flex-col hidden">
                    <h3 className="text-md font-semibold font-poppins">
                        ZapLive
                    </h3>
                    <h5 className="text-xs text-muted-foreground font-poppins">
                        Let's see...
                    </h5>
                </div>
            </div>
            <form
                className="flex lg:w-[400px] items-center relative"
                onSubmit={(e) => e.preventDefault()}
            >
                <Input
                    placeholder="Search"
                    className="rounded-r-none ring-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <X
                        className="absolute right-16 h-4 w-4 text-muted-foreground hover:opacity-75 transition cursor-pointer"
                        onClick={() => setSearch('')}
                    />
                )}
                <Button
                    variant="secondary"
                    className="hover:opacity-75 transition text-muted-foreground rounded-l-none"
                >
                    <Search className="w-5 h-5" strokeWidth={1.5} />
                </Button>
            </form>
            <div className="flex gap-x-6 items-center">
                <Switch checked={darkMoke} onClick={toggleTheme} className='hidden lg:block' />
                <SignInDialog>
                    <Button size="sm" variant="violet">
                        Sign-in
                    </Button>
                </SignInDialog>
            </div>
        </nav>
    );
}
