/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-XSS-Protection',          value: '1; mode=block' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for styles; fonts from Google
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Inline scripts used in some pages (fireworks canvas, etc.)
      "script-src 'self' 'unsafe-inline'",
      // Images from Vercel Blob storage
      "img-src 'self' data: https://*.vercel-storage.com",
      // API calls to Resend (from server-side only, but allow self for fetch)
      "connect-src 'self' https://api.resend.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig = {
  trailingSlash: false,
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: { bodySizeLimit: '15mb' },
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.vercel-storage.com' }],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

module.exports = nextConfig
