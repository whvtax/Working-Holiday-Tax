/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow file uploads up to 15MB (images + PDFs)
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
}

module.exports = nextConfig
