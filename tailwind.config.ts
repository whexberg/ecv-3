import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#C62828',
                secondary: '#003049',
                accent: '#f77f00',
                background: '#000000',
                dk_background: '#000000',
                // background: '#fefae0',
                // dk_background: '#1A1A1A',
            },
        },
    },
    plugins: [],
} satisfies Config;
