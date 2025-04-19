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
  }
};

module.exports = nextConfig; 