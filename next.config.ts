import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    distDir: 'docs',
    cleanDistDir: true,
};

export default nextConfig;
