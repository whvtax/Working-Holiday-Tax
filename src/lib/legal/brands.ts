// The legal details per brand. The text itself lives in legal-text.ts.
import { EMAIL } from '@/lib/constants'
import { SVT_PUBLIC } from '@/lib/svt/brand-public'
import type { LegalBrand } from './legal-text'

export const WHT_LEGAL: LegalBrand = {
  name: 'Working Holiday Tax',
  domain: 'workingholidaytax.com.au',
  email: EMAIL,
  phone: '0424 513 998',
}

/** Student Visa Tax (Jo, 26 Oct). Read from the one SVT source, so the real
 *  number set there at launch reaches the legal pages too. */
export const SVT_LEGAL: LegalBrand = {
  name: SVT_PUBLIC.name,
  domain: SVT_PUBLIC.domain,
  email: SVT_PUBLIC.email,
  phone: SVT_PUBLIC.phone,
}
