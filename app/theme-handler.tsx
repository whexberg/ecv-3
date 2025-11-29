'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

export const ThemeHandler = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState(() => {
        if (typeof localStorage === 'undefined') return;

        let theme = localStorage.getItem('theme');
        if (theme === 'dark' || theme === 'light') return theme;

        if (!theme && typeof window !== 'undefined') {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        }

        return theme;
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleClick = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <>
            {children}
            <button
                id="themeToggle"
                className="group bg-page dark:bg-surface fixed right-4 bottom-4 flex aspect-square cursor-pointer items-center justify-center rounded-full px-2 py-1"
                onClick={handleClick}
            >
                {theme === 'light' ? '🌝' : '🌚'}
            </button>
        </>
    );
};
