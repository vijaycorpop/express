/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    domains: ['panda-express-nutrition.net'],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
