/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/insomniak' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/insomniak/' : '',
  images: {
    domains: [],
    unoptimized: true,
  },
  output: 'export',
};

module.exports = nextConfig; 