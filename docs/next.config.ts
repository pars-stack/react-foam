import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export', // خروجی استاتیک
  basePath: isProd ? '/react-foam' : '', // اسم ریپو
  assetPrefix: isProd ? '/react-foam/' : '', // برای لینک درست به استایل‌ها و اسکریپت‌ها
};

export default nextConfig;
