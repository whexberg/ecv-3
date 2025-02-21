'use client';

import { Noto_Sans } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Heading, Subheading } from '@/components/heading';

const notoSans = Noto_Sans({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'] });

const links = [
    { href: '/', text: 'Home' },
    { href: '/board-members', text: 'The Board' },
    { href: '/calendar', text: 'Calendar' },
    { href: '/hall-of-humbugery', text: 'Hall of Humbugery' },
    { href: '/history-reports', text: 'History Reports' },
] as const;

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openMenu = () => setIsOpen(true);
    const closeMenu = () => setIsOpen(false);

    console.log(isOpen);

    useEffect(() => {
        if (isOpen) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    return (
        <header className="bg-red-800 text-white">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="p-4">
                    <Heading left xlarge>
                        Lord Sholto Douglas
                    </Heading>
                    <Subheading left large>
                        ECV Chapter #3
                    </Subheading>
                </Link>

                <nav className="hidden lg:flex">
                    <ul className="flex items-center justify-center px-6 gap-8 font-semibold" style={notoSans.style}>
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
                    className="z-40 flex lg:hidden flex-col cursor-pointer items-center justify-center w-10 h-10 gap-1 "
                    aria-label="Toggle Menu"
                >
                    <span className="block w-6 h-1 bg-white" />
                    <span className="block w-6 h-1 bg-white" />
                    <span className="block w-6 h-1 bg-white" />
                </button>
            </div>

            {/* Side Menu */}
            <div
                className={`fixed top-0 z-50 right-0 w-64 h-full bg-red-800 text-white transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button
                    onClick={closeMenu}
                    className="flex flex-col items-center justify-center w-10 h-10 gap-1 text-white rounded-md focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <span className={`block w-6 h-1 bg-white transition-transform rotate-45 translate-y-2`} />
                    <span className={`block w-6 h-1 bg-white transition-opacity opacity-0`} />
                    <span className={`block w-6 h-1 bg-white transition-transform -rotate-45 -translate-y-2`} />
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
            {isOpen && <div onClick={closeMenu} className="fixed inset-0 bg-black/50 z-40"></div>}
        </header>
    );
};
