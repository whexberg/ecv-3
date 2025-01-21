import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    distDir: 'build',
    cleanDistDir: true,
};

export default nextConfig;
