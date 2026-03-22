/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent clickjacking — only allow framing from same origin
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Prevent MIME-type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Control referrer information sent with requests
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Restrict browser feature access
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // DNS prefetch control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // Legacy XSS protection for older browsers
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // HSTS — enforce HTTPS for 1 year, include subdomains
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // Content Security Policy
  // Strict policy: only allow resources from self + known external services
  {
    key: 'Content-Security-Policy',
    value: [
      // Default: only self
      "default-src 'self'",
      // Scripts: self + Next.js inline scripts (needed for hydration)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Styles: self + inline (Tailwind/Next.js injects inline styles)
      "style-src 'self' 'unsafe-inline'",
      // Images: self + data URIs (SVGs inline) + workingholidaytax.com.au
      "img-src 'self' data: https://workingholidaytax.com.au",
      // Fonts: self only (next/font self-hosts Google Fonts)
      "font-src 'self'",
      // Connect: self + WhatsApp (wa.me redirects)
      "connect-src 'self'",
      // Forms: self only (no external form submissions)
      "form-action 'self'",
      // Frames: none (we never embed iframes)
      "frame-src 'none'",
      // Prevent embedding in other sites
      "frame-ancestors 'self'",
      // Only load resources over HTTPS
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig = {
  // Remove X-Powered-By: Next.js header (information disclosure)
  poweredByHeader: false,

  // Strict mode for better React error detection
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
