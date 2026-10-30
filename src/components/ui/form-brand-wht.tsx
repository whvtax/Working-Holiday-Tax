'use client'
/** Working Holiday Tax's tax form settings (the values the form always had). */
import { WA_NUMBER } from '@/lib/constants'
import formPaths from '../../../config/form-paths'
import { GoogleReviewsBadge } from '@/components/ui/GoogleReviewsBadge'
import { FormBrandProvider, type FormBrand } from './form-brand'

export const WHT_FORM_BRAND: FormBrand = {
  id: 'wht',
  waNumber: WA_NUMBER,
  langs: [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'de', label: 'DE', full: 'Deutsch' },
    { code: 'ja', label: '日本語', full: '日本語' },
  ],
  // The form pages have reset, random slugs (config/form-paths.js); other pages keep their names.
  url: (lang, page) => {
    const slug = (formPaths.WHT as Record<string, string>)[page] ?? page
    return lang === 'de' || lang === 'ja' ? `/${lang}/${slug}` : `/${slug}`
  },
  sealSrc: '/assets/tpb-registered.png',
  reviews: (lang) => <GoogleReviewsBadge lang={lang === 'de' || lang === 'ja' ? lang : 'en'} />,
  // The success screen's social links (moved here unchanged from FormClient).
  socials: (
<div className="success-socials">
            <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className="success-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.03a4.85 4.85 0 01-1-.34z"/>
              </svg>
              TikTok
            </a>
            <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="success-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Instagram
            </a>
          </div>
  ),
}

export function WhtFormProvider({ children }: { children: React.ReactNode }) {
  return <FormBrandProvider brand={WHT_FORM_BRAND}>{children}</FormBrandProvider>
}
