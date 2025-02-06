import '../globals.css';

import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';
import { useEffect } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { MainContent } from '../components/main-content';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Add multiple classes or use a conditional check
        document.body.classList.add(geistMono.variable, geistSans.variable);

        return () => {
            document.body.classList.remove(geistMono.variable, geistSans.variable);
        };
    }, []);

    return (
        <div className="antialiased flex flex-col min-h-screen border-2 border-gray-200">
            <Header />
            <MainContent>
                <Component {...pageProps} />
            </MainContent>
            <Footer />
        </div>
    );
}
