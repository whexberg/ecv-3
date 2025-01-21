import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    distDir: 'gh-pages',
    cleanDistDir: true,
};

export default nextConfig;
