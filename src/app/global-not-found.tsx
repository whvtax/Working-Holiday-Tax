import type { Metadata } from 'next'
import { headers } from 'next/headers'
import routing from '../../config/brand-routing'
import { svtWhatsappUrl } from '@/lib/svt/brand-public'
import { waUrl } from '@/lib/wa'

/**
 * The 404 page for any address that matches nothing (Next's global
 * not-found: with one root layout per brand there is no shared layout to put
 * it in). The host decides the brand, and only that brand's words, colours and
 * links are rendered, so a student never sees WHT and the reverse. Server
 * only: nothing here ships as JavaScript.
 */
export const metadata: Metadata = { title: 'Page not found', robots: { index: false, follow: false } }

export default async function GlobalNotFound() {
  const host = ((await headers()).get('host') ?? '').toLowerCase().split(':')[0]
  const svt = (routing.SVT_HOSTS as readonly string[]).includes(host)
  // Same page, same words on both brands (Jo, 27 Oct): only the colours change.
  const c = svt
    ? { ink: '#12161F', muted: '#4A5160', faint: 'rgba(18,22,31,0.07)', btnBg: '#12161F', radius: 8, wa: svtWhatsappUrl('Hi, I have a question about my tax.') }
    : { ink: '#080F0D', muted: '#587066', faint: 'rgba(11,82,64,0.08)', btnBg: '#0B5240', radius: 100, wa: waUrl({ topic: 'general', lang: 'en' }) }
  const btn = { display: 'inline-flex', alignItems: 'center', minHeight: 46, padding: '0 22px', borderRadius: c.radius, textDecoration: 'none', fontWeight: 600, fontSize: 13.5 } as const
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', color: c.ink, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
        <main style={{ maxWidth: 440, padding: '48px 20px', textAlign: 'center' }}>
          <p aria-hidden="true" style={{ fontWeight: 900, fontSize: 'clamp(60px,15vw,120px)', lineHeight: 1, margin: '0 0 16px', color: c.faint }}>404</p>
          <h1 style={{ fontSize: 30, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Page not found</h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: c.muted, margin: '0 0 28px' }}>The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            <a href="/" style={{ ...btn, background: c.btnBg, color: '#ffffff' }}>Back to home →</a>
            <a href={c.wa} target="_blank" rel="noopener noreferrer" style={{ ...btn, border: `1.5px solid ${c.ink}`, color: c.ink }}>Contact us</a>
          </div>
        </main>
      </body>
    </html>
  )
}
