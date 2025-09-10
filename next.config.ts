import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
    },
    compiler: { removeConsole: isProd },
};

export default nextConfig;
