/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';
const repoName = 'insomniak';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  assetPrefix: isProduction ? `/${repoName}/` : '',
  basePath: isProduction ? `/${repoName}` : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configuration pour les polices externes
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
};

module.exports = nextConfig; 