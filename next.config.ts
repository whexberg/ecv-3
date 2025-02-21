import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    output: isProd ? 'export' : 'standalone',
    images: { unoptimized: true },
    compiler: { removeConsole: isProd },
};

export default nextConfig;
