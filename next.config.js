/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', '@prisma/adapter-neon'],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    // Exclude large dependencies from Edge runtime bundle
    if (nextRuntime === 'edge') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'crypto': false,
        'fs': false,
        'net': false,
        'tls': false,
      }
    }
    return config
  }
}

module.exports = nextConfig