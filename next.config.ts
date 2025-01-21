import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    basePath: '/ecv-3',
    output: 'export',
    images: {
        unoptimized: true,
    },
    // distDir: 'docs',
    cleanDistDir: true,
};

export default nextConfig;
