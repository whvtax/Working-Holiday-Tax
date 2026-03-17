import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="relative bg-ink-2 min-h-svh flex items-center justify-center overflow-hidden grid-bg">
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: '-25%', right: '-15%', width: '65%', paddingBottom: '65%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(11,82,64,.55) 0%,transparent 68%)' }} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14 relative z-10 text-center py-32">
        <p className="font-serif font-black text-white/10 leading-none mb-6" style={{ fontSize: 'clamp(80px,20vw,180px)' }} aria-hidden="true">404</p>
        <h1 className="font-serif font-black text-white tracking-[-1.5px] leading-[1.05] mb-4" style={{ fontSize: 'clamp(28px,5vw,48px)' }}>
          Page not found
        </h1>
        <p className="text-[16px] font-light text-white/45 leading-[1.75] max-w-[420px] mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-[52px] px-8 bg-amber text-ink-2 rounded-full text-[14px] font-semibold shadow-[0_4px_20px_rgba(233,160,32,0.3)] transition-all hover:bg-amber-300 hover:text-white hover:-translate-y-0.5"
          >
            Back to home →
          </Link>
          <a
            href="https://wa.me/61424513998"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-[52px] px-8 bg-transparent text-white/65 border border-white/15 rounded-full text-[14px] font-normal transition-all hover:bg-white/7 hover:border-white/32 hover:text-white hover:-translate-y-0.5"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  )
}
