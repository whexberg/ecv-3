import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MainContent } from '@/components/main-content';
import { PropsWithChildren } from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Lord Sholto Douglas | ECV #3',
    description:
        'Welcome to the official website of Lord Sholto Douglas, E Clampus Vitus, Chapter #3. Explore our history, upcoming events, membership details, and more. Join us in celebrating the spirit of camaraderie and historical preservation.',
    authors: [
        {
            url: 'http://localhost:8080',
            name: 'Lord Sholto Douglas ECV #3',
        },
    ],

    openGraph: {
        title: 'Lord Sholto Douglas, Chapter #3 - E Clampus Vitus',
        description:
            'Discover the history, events, and membership opportunities with Lord Sholto Douglas, Chapter #3 of E Clampus Vitus.',
        url: 'https://lordsholtodouglas3.com',
        type: 'website',
        images: ['https://lordsholtodouglas3.com/og-image.jpg'],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Lord Sholto Douglas, Chapter #3 - E Clampus Vitus',
        description:
            'Explore the official website of Lord Sholto Douglas, Chapter #3, and join us in celebrating historical preservation and fellowship.',
        images: ['https://lordsholtodouglas3.com/twitter-image.jpg'],
    },
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
                <Header />
                <MainContent>{children}</MainContent>
                <Footer />
            </body>
        </html>
    );
}
