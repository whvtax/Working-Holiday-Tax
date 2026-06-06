/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'X-Frame-Options',         value: 'DENY' },
  { key: 'X-XSS-Protection',        value: '1; mode=block' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()' },
  { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control',       value: 'on' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration chunks. 'unsafe-eval' is only
      // needed for dev HMR, so it's excluded from production builds.
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
      // Tailwind inline styles + Google Fonts stylesheet
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts files
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self, data URIs, blob (object URLs), Supabase Storage, own domain (OG image)
      "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://workingholidaytax.com.au https://lh3.googleusercontent.com",
      // PDF preview iframes + YouTube embeds
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com",
      // Supabase API calls + same-origin
      "connect-src 'self' https://*.supabase.co https://*.supabase.in https://api.resend.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig = {
  trailingSlash: false,
  compress: true,
  eslint:     { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: { bodySizeLimit: '15mb' },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.in' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // Serve llms.txt and llms-full.txt as plain text with cache headers
      // so AI crawlers can ingest the structured content map.
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
      // Static assets - long cache (immutable file content)
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path(favicon\\.svg|icon-192\\.png|icon-512\\.png|apple-touch-icon\\.png|og-image\\.png|manifest\\.json)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Permanent 301 redirects: old /guides URLs → new /blog URLs
      // Preserves SEO authority of any external links pointing to the old paths.
      {
        source: '/guides',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/guides/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      // Slug update: minimum-wage-australia-2024-25 → 2025-26 (kept old URL working)
      {
        source: '/blog/minimum-wage-australia-2024-25',
        destination: '/blog/minimum-wage-australia-2025-26',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
