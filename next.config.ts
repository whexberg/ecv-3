import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    basePath: 'https://whexberg.github.io/ecv-3/',
    output: 'export',
    images: {
        unoptimized: true,
    },
    distDir: 'docs',
    cleanDistDir: true,
};

export default nextConfig;
