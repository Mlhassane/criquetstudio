/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sanity.io',
      },
    ],
  },
  // Increase timeout for image optimization
  experimental: {
    imageLoaderTimeoutInSeconds: 30,
  },
}

module.exports = nextConfig