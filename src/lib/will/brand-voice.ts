/**
 * One Will, two brands (decision 004).
 *
 * Will's engine, model, rules and texts are written for Working Holiday Tax.
 * Student Visa Tax uses ALL of it unchanged (Jo, 26 Oct: "Will copies
 * everything relevant exactly the same"), with two transformations applied at
 * the only two places text leaves the system:
 *   - rebrandText: every message a customer receives (channel.deliverOut);
 *   - rebrandPrompt: every prompt the model reads (llm-transport).
 * For WHT both return their input untouched (the same string), which is what
 * guarantees WHT behaviour stays byte for byte the same. brandLeaks is the
 * last check before a send: a message carrying the other brand is blocked.
 */
import { BRANDS, type Brand } from '@/lib/brand'
import { SVT_PUBLIC } from '@/lib/svt/brand-public'

export interface BrandVoice {
  brand: Brand
  name: string
  /** Internal name of the assistant, used in prompts and the CRM. Customers
   *  never see it: messages go out as "the team". */
  agentName: string
  domain: string
  siteUrl: string
  formUrl: string
  /** Fee for a super (DASP) claim. Jo, 26 Oct: $220 for SVT, infrastructure
   *  only for now; Will hands DASP questions to the team and quotes nothing. */
  daspFeeAud: number | null
}

export const VOICES: Readonly<Record<Brand, BrandVoice>> = {
  wht: {
    brand: 'wht', name: BRANDS.wht.name, agentName: 'Will', domain: BRANDS.wht.domain,
    siteUrl: BRANDS.wht.siteUrl, formUrl: `${BRANDS.wht.siteUrl}/tax-form`, daspFeeAud: null,
  },
  svt: {
    // agentName: Mia, chosen by Jo on 26 Oct.
    brand: 'svt', name: BRANDS.svt.name, agentName: 'Mia', domain: BRANDS.svt.domain,
    siteUrl: BRANDS.svt.siteUrl, formUrl: `${BRANDS.svt.siteUrl}/tax-form`, daspFeeAud: 220,
  },
}

const svtPhoneDigits = BRANDS.svt.whatsappNumber // 61 + national number, no zero
const svtNational = BRANDS.svt.phone

/** Ordered WHT → SVT replacements for anything a customer can read. Longest
 *  and most specific first, so a URL is rewritten whole before the bare name. */
const TEXT_REPLACEMENTS: ReadonlyArray<[RegExp, string]> = [
  // Any Google review link (WHT's profile, or a Place ID override) becomes
  // the student brand's own profile (Jo, 27 Oct). First, before the domains.
  [/https:\/\/(?:g\.page\/r\/[A-Za-z0-9_-]+\/review|search\.google\.com\/local\/writereview\?placeid=[A-Za-z0-9_-]+)/g, SVT_PUBLIC.googleReviewUrl],
  [/https?:\/\/(?:www\.)?workingholidaytax\.com(?:\.au)?/gi, BRANDS.svt.siteUrl],
  [/(?:www\.)?workingholidaytax\.com(?:\.au)?/gi, BRANDS.svt.domain],
  [/info@workingholidaytax\.com\.au/gi, BRANDS.svt.email],
  [/Working Holiday Tax/g, BRANDS.svt.name],
  [/working holiday tax/g, BRANDS.svt.name],
  [/\+61\s?424\s?513\s?998/g, `+${svtPhoneDigits}`],
  [/\b61424513998\b/g, svtPhoneDigits],
  [/\b0424\s?513\s?998\b/g, svtNational],
]

/** Extra replacements for prompts only: who the customers are. Topic words
 *  ("working holiday visa") stay, because a student may well have held one. */
const PROMPT_REPLACEMENTS: ReadonlyArray<[RegExp, string]> = [
  [/Working Holiday Makers \(backpackers\)/gi, 'international students and graduates (500 and 485 visas)'],
  [/working holiday makers \(backpackers\)/gi, 'international students and graduates (500 and 485 visas)'],
  [/for backpackers/gi, 'for international students'],
  [/\bYou are Will\b/g, `You are ${VOICES.svt.agentName}`],
  [/"Will", the WhatsApp assistant/g, `"${VOICES.svt.agentName}", the WhatsApp assistant`],
]

/** Appended to every SVT system prompt. Overrides the WHM-only rules of the
 *  shared playbook; everything else (tone, guardrails, prices, flow) is kept. */
export const SVT_PROMPT_ADDENDUM = `

STUDENT VISA TAX (this conversation is with a Student Visa Tax customer; these rules override any rule above that is only for working holiday makers):
- The customers are international students and graduates in Australia (student visa 500, graduate visa 485). Do not treat them as working holiday makers and never quote working holiday maker tax rates.
- Residency: a student on a course of 6 months or more is usually an Australian resident for tax purposes, and a course shorter than 6 months usually means foreign resident. Always say "usually" or "may be"; the team confirms residency before lodging. Do not send the working holiday residency quiz.
- If a customer was on a working holiday visa (417 or 462) earlier, that is normal; mention it to the team when it matters (it can change how super is taxed).
- Medicare levy: many students can claim an exemption with a Medicare Entitlement Statement from Services Australia, which they apply for through myGov from 1 July; they must wait for it before we lodge.
- Delivery or other ABN work: the $385 price applies.
- Super (DASP) claims: say we can help with it, and hand it to the team. Do not quote a price.
- The website is ${BRANDS.svt.siteUrl} and the form is ${VOICES.svt.formUrl}. Never mention or link to any other brand or website of ours.
- The customer may write in English, Chinese or Vietnamese; reply in their language.`

function applyAll(text: string, rules: ReadonlyArray<[RegExp, string]>): string {
  let out = text
  for (const [re, to] of rules) out = out.replace(re, to)
  return out
}

/** Customer-facing text for a brand. WHT: the input, unchanged. */
export function rebrandText(text: string, brand: Brand): string {
  if (brand !== 'svt' || !text) return text
  return applyAll(text, TEXT_REPLACEMENTS)
}

/** A system prompt for a brand. WHT: the input, unchanged. */
export function rebrandPrompt(prompt: string, brand: Brand): string {
  if (brand !== 'svt' || !prompt) return prompt
  return applyAll(applyAll(prompt, PROMPT_REPLACEMENTS), TEXT_REPLACEMENTS) + SVT_PROMPT_ADDENDUM
}

/** The SVT number in any usual spelling: 04xx..., +61 4xx..., 614xx... */
const SVT_PHONE_RE = new RegExp(`(?:\\+?61\\s?|\\b0)${BRANDS.svt.phone.replace(/\D/g, '').replace(/^0/, '').split('').join('\\s?')}`)

const LEAKS: Readonly<Record<Brand, ReadonlyArray<[string, RegExp]>>> = {
  // What must never reach an SVT customer.
  svt: [
    ['Working Holiday Tax', /working\s*holiday\s*tax\b/i],
    ['workingholidaytax', /workingholidaytax/i],
    ['WHT phone', /(?:\+?61\s?|\b0)424\s?513\s?998/],
  ],
  // What must never reach a WHT customer.
  wht: [
    ['Student Visa Tax', /student\s*visa\s*tax\b/i],
    ['studentvisatax', /studentvisatax/i],
    ['SVT phone', SVT_PHONE_RE],
  ],
}

/** Marks of the OTHER brand found in a text meant for `brand`. Empty = clean. */
export function brandLeaks(text: string, brand: Brand): string[] {
  if (!text) return []
  const found: string[] = []
  for (const [label, re] of LEAKS[brand]) {
    // Bare name match excludes the domain form so each mark is reported once.
    if (label === 'Working Holiday Tax' || label === 'Student Visa Tax') {
      if (re.test(text.replace(/workingholidaytax|studentvisatax/gi, ''))) found.push(label)
    } else if (re.test(text)) found.push(label)
  }
  return found
}

/** Meta templates belong to the account (one account for both numbers, Jo,
 *  26 Oct), and their approved text is fixed at Meta. For an SVT customer:
 *   - a template whose approved text names no brand is shared as it is (it
 *     must be listed in `shared`, filled from svtTemplateReadiness below);
 *   - any other template is replaced by its SVT twin, same name + "_svt".
 *  Default (nothing listed) is the safe one: always the twin. */
export function svtTemplateName(name: string, shared: ReadonlySet<string> = sharedTemplatesFromEnv()): string {
  if (name.endsWith('_svt') || shared.has(name)) return name
  return `${name}_svt`
}

export function sharedTemplatesFromEnv(env: Record<string, string | undefined> = process.env): ReadonlySet<string> {
  return new Set((env.SVT_SHARED_TEMPLATES ?? '').split(',').map(x => x.trim()).filter(Boolean))
}

/** From Meta's template list (name, status, body text): which approved
 *  templates name no brand and can be shared, which name WHT and need an SVT
 *  twin, and which twins already exist. */
export function svtTemplateReadiness(rows: ReadonlyArray<{ name?: string; status?: string; components?: ReadonlyArray<{ type?: string; text?: string }> }>): {
  shareable: string[]; needTwin: string[]; twinsApproved: string[]
} {
  const approved = rows.filter(r => r.name && (r.status ?? '').toUpperCase() === 'APPROVED')
  const names = new Set(approved.map(r => r.name!))
  const shareable = new Set<string>()
  const needTwin = new Set<string>()
  for (const r of approved) {
    if (r.name!.endsWith('_svt')) continue
    const text = (r.components ?? []).map(c => c.text ?? '').join('\n')
    if (brandLeaks(text, 'svt').length) needTwin.add(r.name!)
    else shareable.add(r.name!)
  }
  // A template with ANY language naming WHT needs a twin for all of them.
  for (const n of needTwin) shareable.delete(n)
  return {
    shareable: [...shareable].sort(),
    needTwin: [...needTwin].sort(),
    twinsApproved: [...needTwin].filter(n => names.has(`${n}_svt`)).sort(),
  }
}

/** The tax form link of EITHER brand. Used by the safety rules that must
 *  recognise a form link ("never before payment", "form already sent"), so a
 *  rule cannot be side-stepped by the other brand's domain. */
export const FORM_LINK_ANY_BRAND = /(?:workingholidaytax\.com(?:\.au)?|studentvisatax\.com\.au)\/tax-form/i

/** The brand's own site, as allowed in a reply. Only the CURRENT brand's
 *  domain is ever allowed; the other brand's domain is a foreign URL. */
export function ownSiteHostPattern(brand: Brand): string {
  return brand === 'svt' ? 'studentvisatax\\.com\\.au' : 'workingholidaytax\\.com\\.au'
}
