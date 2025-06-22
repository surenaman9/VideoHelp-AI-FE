/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL || 'http://localhost:8000',
  },
  reactStrictMode: false,
  // Disable SWC completely and use Babel instead
  swcMinify: false,
  experimental: {
    forceSwcTransforms: false,
  },
  // Use Babel for compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Webpack configuration to handle potential issues
  webpack: (config, { dev, isServer }) => {
    // Fallback for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig