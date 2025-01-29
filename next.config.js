/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true, 
    domains: ['panda-express-nutrition.net'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
