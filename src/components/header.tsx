'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
    { href: '/', text: 'Home' },
    { href: '/hall-of-humbugery', text: 'Hall of Humbugery' },
    { href: '/board-members', text: 'Board Members' },
    { href: '/events', text: 'Events' },
    // { href: '/contact', text: 'Contact' },
] as const;

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isOpen) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
        return () => document.body.classList.remove('overflow-hidden');
    }, [isOpen]);

    return (
        <header className="bg-primary text-white py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Lord Sholto Douglas, ECV Chapter #3</h1>

                {/* Hamburger Icon */}
                <button
                    onClick={toggleMenu}
                    className="z-60 flex flex-col items-center justify-center w-10 h-10 gap-1 "
                    aria-label="Toggle Menu"
                >
                    <span className="block w-6 h-1 bg-white" />
                    <span className="block w-6 h-1 bg-white" />
                    <span className="block w-6 h-1 bg-white" />
                </button>
            </div>

            {/* Side Menu */}
            <div
                className={`fixed top-0 z-50 right-0 w-64 h-full bg-primary text-white transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button
                    onClick={toggleMenu}
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
                                <Link href={href} className="hover:underline" onClick={toggleMenu}>
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Background Overlay */}
            {isOpen && <div onClick={toggleMenu} className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}
        </header>
    );
};
