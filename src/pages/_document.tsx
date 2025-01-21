import { Html, Head, Main, NextScript } from 'next/document';
import type { Metadata } from 'next';

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

export default function Document() {
    return (
        <Html lang="en">
            <Head title="Lord Sholto Douglas | ECV #3" />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
