import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
    },
    experimental: { optimizeCss: true },
    compiler: { removeConsole: isProd },
};

export default nextConfig;
