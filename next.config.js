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
  // Increase body size limit for API routes (file uploads: bank statement + selfie + invoices)
  // Without this, Vercel/Next.js uses 4.5MB default which breaks multi-file uploads
  api: {
    bodyParser: {
      sizeLimit: '15mb',
    },
    responseLimit: '15mb',
  },
}

module.exports = nextConfig
