/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure URLs never have trailing slashes (canonical consistency for SEO)
  trailingSlash: false,
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
