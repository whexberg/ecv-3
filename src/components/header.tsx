'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
    { href: '/', text: 'Home' },
    { href: '/board-members', text: 'The Board' },
    { href: '/calendar', text: 'Calendar' },
    { href: '/hall-of-humbuggery', text: 'Hall of Humbuggery' },
    { href: '/history-reports', text: 'History Reports' },
] as const;

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen((p) => !p);

    useEffect(() => {
        if (isOpen) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    return (
        <nav className="bg-surface dark:bg-page shadow-card mb-1 font-serif">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <span className="stamp text-xs sm:text-base">LORD SHOLTO DOUGLAS #3</span>
                    </div>

                    {/*<Button*/}
                    {/*    onClick={() => {*/}
                    {/*        document.documentElement.classList.toggle('dark');*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Switch Theme*/}
                    {/*</Button>*/}

                    <div className="hidden space-x-4 text-sm font-bold tracking-wide uppercase lg:flex">
                        {links.map(({ href, text }) => (
                            <Link
                                key={href + text}
                                href={href}
                                className="text-on-surface dark:text-on-page hover:text-accent group relative block py-2 tracking-widest uppercase"
                                onClick={closeMenu}
                            >
                                {text}
                                <span className="absolute bottom-1 left-0 hidden h-0.5 w-0 bg-current transition-all duration-300 ease-in-out group-hover:w-full lg:block" />
                            </Link>
                        ))}
                    </div>

                    {/*Mobile menu button*/}
                    <div className="lg:hidden">
                        <button onClick={toggleMenu} className="text-on-surface hover:text-accent focus:outline-none">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}

            <div className={clsx(isOpen || 'hidden', 'space-y-3 p-4 text-sm font-bold lg:hidden')}>
                {links.map(({ href, text }) => (
                    <Link
                        key={href + text}
                        href={href}
                        className="text-on-surface dark:text-on-page hover:bg-accent hover:text-on-accent group relative block p-4 py-2 pb-[-1rem] tracking-widest uppercase"
                        onClick={() => closeMenu()}
                    >
                        {text}
                    </Link>
                ))}
            </div>
        </nav>
    );
};
