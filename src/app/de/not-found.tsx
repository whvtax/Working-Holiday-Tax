import Link from 'next/link'
import type { Metadata } from 'next'
import { WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden | Working Holiday Tax',
  description: 'Die gesuchte Seite existiert nicht. Zurück zur Startseite.',
  robots: { index: false, follow: true },
}

export default function NotFoundDE() {
  return (
    <div className="relative bg-white min-h-svh flex items-center justify-center overflow-hidden pt-[68px]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 relative z-10 text-center py-20">
        <p
          className="font-serif font-black leading-none mb-4"
          style={{ fontSize: 'clamp(60px,15vw,120px)', color: 'rgba(11,82,64,0.08)' }}
          aria-hidden="true"
        >
          404
        </p>
        <h1
          className="font-serif font-black text-ink mb-3"
          style={{ fontSize: 'clamp(22px,3.5vw,36px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}
        >
          Seite nicht gefunden
        </h1>
        <p
          className="font-light text-muted leading-[1.7] max-w-[380px] mx-auto mb-8"
          style={{ fontSize: '14px' }}
        >
          Diese Seite existiert nicht. Lass uns dich zurück auf Kurs bringen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link href="/de" className="btn-primary" style={{ height: '46px', padding: '0 24px', fontSize: '13.5px' }}>
            Zur Startseite →
          </Link>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-dark"
            style={{ height: '46px', padding: '0 20px', fontSize: '13.5px' }}
          >
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </div>
  )
}
