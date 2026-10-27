import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { SITE_URL } from '@/lib/constants'
import { WHT_LEGAL } from '@/lib/legal/brands'
import { privacySections } from '@/lib/legal/legal-text'

const sections = privacySections(WHT_LEGAL)

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Working Holiday Tax privacy policy - how we collect, use and protect your personal information.',
  alternates: {
    canonical: '/privacy',
    languages: {
      'en': '/privacy', 'en-AU': '/privacy',
      'de': '/de/privacy',
      'ja': '/ja/privacy',
      'x-default': '/privacy',
    },
  },
  // Force the same share image as the homepage for every link to this page.
  openGraph: {
    url: `${SITE_URL}/privacy`,
    title: 'Privacy Policy',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/og-image.png`],
  },
}


export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="Legal"
        title="Privacy Policy"
        titleEm=""
        sub={<><span className="hidden lg:inline">Last updated: May 2026. We are committed to protecting your privacy.</span><span className="lg:hidden">Last updated: May 2026.<br />We are committed to protecting your privacy.</span></>}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="pt-0 pb-10 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            {/* Intro statement */}
            <p className="text-[13px] font-light text-body leading-[1.75] mb-8">
              We are committed to protecting your privacy and handling your personal information responsibly.
            </p>

            {sections.map((s, i) => (
              <div key={i} className={`mb-8 reveal delay-${(i % 4) + 1}`}>
                <h2 className="font-serif text-[16px] font-bold text-ink mb-2">{s.title}</h2>
                {s.body && (
                  <p className="text-[13px] font-light text-body leading-[1.75] mb-2">{s.body}</p>
                )}
                {s.items && (
                  <ul className="mt-2 space-y-1.5">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-[7px] flex-shrink-0 rounded-full" style={{ width: '5px', height: '5px', minWidth: '5px', background: '#0B5240' }} />
                        <span className="text-[13px] font-light text-body leading-[1.75]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}
