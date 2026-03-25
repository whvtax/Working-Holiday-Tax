/** @type {import('next').NextConfig} */

/**
 * Security headers are now set dynamically per-request in src/middleware.ts
 * (nonce-based CSP — cannot be static). The headers() below only cover
 * static asset caching which middleware intentionally skips.
 */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

module.exports = nextConfig
