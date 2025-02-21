import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    red: '#B74141', // Clamper Red
                    black: '#2D2D2D', // Iron Black
                    gold: '#D1A054', // Gold Dust
                },
                background: {
                    tan: '#EAD7C5', // Old Parchment
                },
                accent: {
                    brown: '#8C6A4F', // Whiskey Barrel
                },
                neutral: {
                    grey: '#A8A8A8', // Weathered Steel
                },
            },
            // colors: {
            //     primary: '#C62828',
            //     secondary: '#003049',
            //     accent: '#f77f00',
            //     background: '#000000',
            //     dk_background: '#000000',
            //     // background: '#fefae0',
            //     // dk_background: '#1A1A1A',
            // },
        },
    },
    plugins: [],
} satisfies Config;
