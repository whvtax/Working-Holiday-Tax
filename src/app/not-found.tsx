import Link from 'next/link'
import type { Metadata } from 'next'
import { WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="relative bg-white min-h-svh flex items-center justify-center overflow-hidden pt-[68px]">
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10 text-center py-20">
        <p className="font-serif font-black leading-none mb-4" style={{ fontSize: 'clamp(60px,15vw,120px)', color: 'rgba(11,82,64,0.08)' }} aria-hidden="true">404</p>
        <h1 className="font-serif font-black text-ink mb-3" style={{ fontSize: 'clamp(22px,3.5vw,36px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
          Page not found
        </h1>
        <p className="font-light text-muted leading-[1.7] max-w-[380px] mx-auto mb-8" style={{ fontSize: '14px' }}>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link href="/" className="btn-primary" style={{ height: '46px', padding: '0 24px', fontSize: '13.5px' }}>
            Back to home →
          </Link>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark" style={{ height: '46px', padding: '0 20px', fontSize: '13.5px' }}>
            Contact us
          </a>
        </div>
      </div>
    </div>
  )
}
