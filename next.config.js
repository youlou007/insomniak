/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/poeme' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/poeme/' : '',
  images: {
    domains: [],
    unoptimized: true,
  },
};

module.exports = nextConfig; 