'use client';

import { Noto_Sans } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Heading, Subheading } from '@/src/components/heading';

const notoSans = Noto_Sans({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'] });

const links = [
    { href: '/', text: 'Home' },
    { href: '/board-members', text: 'The Board' },
    { href: '/calendar', text: 'Calendar' },
    { href: '/hall-of-humbuggery', text: 'Hall of Humbuggery' },
    { href: '/history-reports', text: 'History Reports' },
] as const;

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openMenu = () => setIsOpen(true);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        if (isOpen) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    return (
        <header className="bg-red-800 text-white">
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link href="/public" className="p-4">
                    <Heading left xlarge>
                        Lord Sholto Douglas
                    </Heading>
                    <Subheading left large>
                        ECV Chapter #3
                    </Subheading>
                </Link>

                <nav className="hidden lg:flex">
                    <ul className="flex items-center justify-center gap-8 px-6 font-semibold" style={notoSans.style}>
                        {links.map(({ href, text }) => (
                            <li key={href}>
                                <Link href={href} className="hover:underline">
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Hamburger Icon */}
                <button
                    onClick={openMenu}
                    className="z-40 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1 lg:hidden"
                    aria-label="Toggle Menu"
                >
                    <span className="block h-1 w-6 bg-white" />
                    <span className="block h-1 w-6 bg-white" />
                    <span className="block h-1 w-6 bg-white" />
                </button>
            </div>

            {/* Side Menu */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-red-800 text-white transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button
                    onClick={closeMenu}
                    className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-md text-white focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <span className={`block h-1 w-6 translate-y-2 rotate-45 bg-white transition-transform`} />
                    <span className={`block h-1 w-6 bg-white opacity-0 transition-opacity`} />
                    <span className={`block h-1 w-6 -translate-y-2 -rotate-45 bg-white transition-transform`} />
                </button>
                <nav className="mt-16">
                    <ul className="flex flex-col space-y-4 px-6">
                        {links.map(({ href, text }) => (
                            <li key={href}>
                                <Link href={href} className="hover:underline" onClick={closeMenu}>
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Background Overlay */}
            {isOpen && <div onClick={closeMenu} className="fixed inset-0 z-40 bg-black/50"></div>}
        </header>
    );
};
