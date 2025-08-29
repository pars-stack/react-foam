import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/react-foam' : '',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/react-foam/' : '',
};

export default nextConfig;
