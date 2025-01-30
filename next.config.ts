import type { NextConfig } from 'next';

// const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    // basePath: isProd ? '/ecv-3' : undefined,
    // output: 'export',
    images: {
        unoptimized: true,
    },
    // distDir: 'docs',
    cleanDistDir: true,
};

export default nextConfig;
