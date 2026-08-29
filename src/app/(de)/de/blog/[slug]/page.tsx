/**
 * German guide page. All template logic lives in LocaleGuidePage; this file is
 * the German half of the config: strings, SEO data, and the latin text rules.
 * The values reproduce the pre-merge German page exactly (verified by
 * byte-comparing the built HTML of every /de/blog page).
 */
import type { Metadata } from 'next'
import { catLabelDe } from '@/lib/category-labels'
import { formatGuideDateDe } from '@/lib/blog-dates'
import { getGermanGuide, deCategoryMeta, blogUI } from '../data'
import {
  LocalizedGuidePage,
  buildGuideMetadata,
  localizedGuideStaticParams,
  type GuideLocaleConfig,
} from '@/components/blog/LocaleGuidePage'

const cfg: GuideLocaleConfig = {
  locale: 'de',
  basePath: '/de',
  ogLocale: 'de_DE',
  getGuide: getGermanGuide,
  categoryMeta: deCategoryMeta,
  catLabel: catLabelDe,
  formatDate: formatGuideDateDe,
  englishOnlyNotice: blogUI.englishOnlyNotice,

  categoryKeywords: {
    'TFN': [
      'TFN beantragen Working Holiday',
      'Steuernummer Australien Backpacker',
      'TFN 417 Visum',
      'TFN 462 Visum',
      'TFN für Steuerrückerstattung',
    ],
    'ABN': [
      'ABN Registrierung Working Holiday',
      'Australian Business Number Backpacker',
      'Selbstständig Australien WHV',
      'ABN 417 Visum',
      'ABN 462 Visum',
    ],
    'Tax Return': [
      'Steuerrückerstattung Australien Working Holiday',
      'WHV Steuererklärung',
      'Steuerrückerstattung 417 Visum',
      'Steuerrückerstattung 462 Visum',
      'Steuer zurück Australien Backpacker',
      'Steuererklärung Australien nach Rückkehr',
    ],
    'Super': [
      'Super-Rückerstattung Australien',
      'DASP-Auszahlung Working Holiday',
      'Super zurückholen Australien Backpacker',
      'Departing Australia Superannuation Payment',
      'Super-Rückerstattung 417 Visum',
    ],
    'Work Rights': [
      'Arbeitsrechte Working Holiday Australien',
      'Fair Work Australien Backpacker',
      'Working Holiday Beschäftigung Australien',
      '417 Visum Arbeitsbedingungen',
      '462 Visum Arbeitsbedingungen',
    ],
    'Medicare & Other': [
      'Medicare Levy Befreiung Backpacker',
      'Medicare Working Holiday Visum',
      'RHCA Australien Deutsch',
      'Medicare Levy Befreiung 417',
      'Medicare Levy Befreiung 462',
    ],
  },
  coreKeywords: [
    'Steuerrückerstattung Australien',
    'Working Holiday Steuer Australien',
    'Working Holiday Visum Australien',
    '417 Visum Australien',
    '462 Visum Australien',
    'Backpacker Steuer Australien',
    'WHM Steuer',
    'WHV Steuer',
  ],
  ldKeywords: (category) => [
    'Working Holiday Tax',
    'Australien',
    '417 Visum',
    '462 Visum',
    category,
    'Backpacker Steuer',
  ],
  reviewedByDescription: 'Registrierter Steueragent, der die von Working Holiday Tax vorbereitete Arbeit prüft und freigibt.',
  authorDescription: 'Auf Working Holiday Maker (Visumklassen 417 und 462) spezialisierter australischer Steuerservice.',
  knowsAbout: [
    'Australisches Steuerrecht',
    'Working Holiday Visum (Subclass 417, 462)',
    'Tax File Number (TFN)',
    'Australian Business Number (ABN)',
    'Superannuation und DASP',
    'Medicare Levy',
    'Fair Work Australia',
  ],
  audienceName: 'Working Holiday Visuminhaber in Australien (Subclass 417 und 462)',
  aboutThingName: 'Working Holiday Visum Australien',
  serviceForCategory: {
    'TFN': {
      path: '/de/tfn',
      label: 'Was wir bei TFN und Erklärungsformular übernehmen',
      blurb: 'Die Nummer ist kostenlos und dauert zehn Minuten. Entscheidend ist das Formular beim Arbeitgeber, und genau das übernehmen wir.',
    },
    'ABN': {
      path: '/de/abn',
      label: 'Was wir machen, wenn du über eine ABN abgerechnet hast',
      blurb: 'Lohn und Rechnungseinkommen werden unterschiedlich besteuert und stehen anders in der Erklärung. Diese Aufteilung richtig zu setzen ist die eigentliche Arbeit.',
    },
    'Tax Return': {
      path: '/de/tax-return',
      label: 'Was wir bei jeder Steuererklärung durchgehen',
      blurb: 'Steuerlicher Wohnsitz, Wochen mit dem falschen Steuersatz, die Medicare-Frage und die Abzüge, die zu deiner echten Arbeit gehören.',
    },
    'Super': {
      path: '/de/superannuation',
      label: 'Was wir vor deiner Abreise mit deiner Super machen',
      blurb: 'Gelegenheitsarbeit verteilt die Super auf mehrere Fonds. Wir finden jedes Konto über deine TFN und stellen den Antrag einmal, in der richtigen Reihenfolge.',
    },
    'Medicare & Other': {
      path: '/de/medicare',
      label: 'Was wir bei der Medicare Levy machen',
      blurb: 'Die Levy wird standardmäßig abgezogen. Für die Befreiung brauchst du eine Bescheinigung, die beantragt werden muss, und sie wird bei Backpacker-Erklärungen am häufigsten übersehen.',
    },
    'Work Rights': {
      path: '/de/tax-return',
      label: 'Was wir bei jeder Steuererklärung durchgehen',
      blurb: 'Wenn davon etwas deinen Lohn oder deine Stunden betroffen hat, taucht es meistens auch in deiner Steuererklärung auf.',
    },
  },

  homeLabel: 'Startseite',
  blogLabel: 'Blog',
  publishedLabel: 'Veröffentlicht ',
  reviewedLabel: 'Geprüft ',
  readTimeLabel: (m) => `${m ?? ''} Min. Lesezeit`,
  whatsNextLabel: 'Wie es weitergeht',
  whatWeDoLabel: 'Was wir machen',
  viewAllLabel: (label) => `Alle ${label}-Artikel ansehen →`,
  aside: {
    label: 'Über diesen Ratgeber',
    p1: 'Geschrieben vom Team von Working Holiday Tax, das ausschließlich mit Inhabern von 417- und 462-Visa arbeitet, und anhand der aktuellen Vorgaben von ATO und Fair Work geprüft. Allgemeine Informationen, keine persönliche Steuerberatung.',
    p2: 'Steuererklärungen werden vor der Einreichung beim ATO von einem registrierten Steueragenten geprüft und freigegeben.',
  },

  styles: {
    h1: { lineHeight: 1.1, letterSpacing: '-0.03em' },
    leadLineHeight: 1.62,
    noticeLineHeight: 1.6,
    asideLabel: { fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase' },
    asideBodyLineHeight: 1.65,
    asideDateLineHeight: 1.6,
    relatedHeader: { fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.15em', textTransform: 'uppercase' },
    relatedTitleLineHeight: 1.35,
    relatedDescLineHeight: 1.6,
    serviceLabel: { fontSize: '10.5px', fontWeight: 700, color: '#0B5240', letterSpacing: '0.12em' },
  },

  faq: {
    minAnswer: () => 150,
    listAsSentence: (items) => {
      const cleaned = items.map(i => i.replace(/[;,.\s]+$/, '').trim()).filter(Boolean)
      return cleaned.length > 0 ? `${cleaned.join('; ')}.` : ''
    },
    trimToSentence: (text, max) => {
      if (text.length <= max) return text
      const slice = text.slice(0, max)
      const cut = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '))
      if (cut > max * 0.5) return slice.slice(0, cut + 1).trim()
      return `${slice.replace(/\s+\S*$/, '').trim()}.`
    },
    joinBlocks: (a, b) => `${a} ${b}`,
    colonCut: (out) => out.lastIndexOf('. '),
    terminalPunctuation: () => '.',
    endsWithPunctuation: /[.!?]$/,
    headingColon: /[.:!?]$/,
  },
  howToNameMax: 60,
  isQuestionPost: (_slug, title) => {
    const titleLower = title.toLowerCase()
    return (
      titleLower.startsWith('what ') ||
      titleLower.startsWith('was ') ||
      titleLower.startsWith('when ') ||
      titleLower.startsWith('wann ') ||
      titleLower.startsWith('why ') ||
      titleLower.startsWith('warum ') ||
      titleLower.startsWith('can ') ||
      titleLower.startsWith('kann ') ||
      titleLower.startsWith('kannst ') ||
      titleLower.startsWith('do ') ||
      titleLower.startsWith('does ') ||
      titleLower.startsWith('should ') ||
      titleLower.startsWith('is ') ||
      titleLower.startsWith('are ') ||
      titleLower.startsWith('ist ') ||
      titleLower.startsWith('sind ') ||
      titleLower.startsWith('hast ') ||
      titleLower.startsWith('haben ') ||
      titleLower.startsWith('müssen ') ||
      titleLower.startsWith('musst ') ||
      titleLower.startsWith('brauchst ') ||
      titleLower.endsWith('?')
    )
  },
  orgEntities: [
    { match: /\bATO\b|Australian Taxation Office|Finanzamt/, name: 'Australian Taxation Office', sameAs: 'https://www.ato.gov.au/' },
    { match: /Fair Work|Fairwork/i, name: 'Fair Work Ombudsman', sameAs: 'https://www.fairwork.gov.au/' },
    { match: /\bABR\b|Australian Business Register/, name: 'Australian Business Register', sameAs: 'https://www.abr.gov.au/' },
    { match: /Services Australia|Medicare/, name: 'Services Australia', sameAs: 'https://www.servicesaustralia.gov.au/' },
    { match: /Department of Home Affairs|Heimatministerium/i, name: 'Department of Home Affairs', sameAs: 'https://www.homeaffairs.gov.au/' },
    { match: /myGov|MyGov/, name: 'myGov', sameAs: 'https://my.gov.au/' },
  ],
  placeEntities: [
    { match: /\bSydney\b/, name: 'Sydney', sameAs: 'https://en.wikipedia.org/wiki/Sydney' },
    { match: /\bMelbourne\b/, name: 'Melbourne', sameAs: 'https://en.wikipedia.org/wiki/Melbourne' },
    { match: /\bBrisbane\b/, name: 'Brisbane', sameAs: 'https://en.wikipedia.org/wiki/Brisbane' },
    { match: /\bPerth\b/, name: 'Perth', sameAs: 'https://en.wikipedia.org/wiki/Perth' },
    { match: /\bAdelaide\b/, name: 'Adelaide', sameAs: 'https://en.wikipedia.org/wiki/Adelaide' },
    { match: /\bDarwin\b/, name: 'Darwin', sameAs: 'https://en.wikipedia.org/wiki/Darwin,_Northern_Territory' },
    { match: /\bCairns\b/, name: 'Cairns', sameAs: 'https://en.wikipedia.org/wiki/Cairns' },
    { match: /\bCanberra\b/, name: 'Canberra', sameAs: 'https://en.wikipedia.org/wiki/Canberra' },
    { match: /\bHobart\b/, name: 'Hobart', sameAs: 'https://en.wikipedia.org/wiki/Hobart' },
    { match: /Gold Coast/, name: 'Gold Coast', sameAs: 'https://en.wikipedia.org/wiki/Gold_Coast,_Queensland' },
  ],
  whvMention: /Working Holiday|417|462|WHV/,
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return localizedGuideStaticParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildGuideMetadata(cfg, (await params).slug)
}

export default async function GermanGuidePage({ params }: Props) {
  return <LocalizedGuidePage cfg={cfg} slug={(await params).slug} />
}
