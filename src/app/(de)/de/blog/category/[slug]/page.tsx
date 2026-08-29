/**
 * German category hub. Template logic lives in LocaleCategoryPage; this file
 * carries the German half of the config plus the per-category introductions.
 * Values reproduce the pre-merge page exactly (HTML byte-compared).
 */
import type { Metadata } from 'next'
import { catLabelDe } from '@/lib/category-labels'
import { getGermanGuides, deCategoryMeta, getGermanCategoryMeta } from '../../data'
import {
  LocalizedCategoryPage,
  buildCategoryMetadata,
  localizedCategoryStaticParams,
  type CategoryLocaleConfig,
  type CategoryIntro,
} from '@/components/blog/LocaleCategoryPage'

/* ── The category introduction ────────────────────────────────────────────
   Two paragraphs per category that stand on their own: what the category
   covers, and who it is for, ending on what decides the answer rather than
   on how to do it yourself. Then one link to the service page that owns the
   cluster. The copy lives here rather than in data.ts because another
   rewrite owns that file. */

const CATEGORY_INTRO: Record<string, CategoryIntro> = {
  'tfn': {
    paragraphs: [
      'Die Tax File Number ist die Nummer, mit der die australische Steuerbehörde ATO dich identifiziert. Für die Nummer selbst fällt keine Behördengebühr an. Teuer sind die Wochen ohne sie, in denen 45 % statt 15 % einbehalten werden. Diese Ratgeber behandeln den Antrag selbst, das Arbeiten in der Wartezeit, Verzögerungen über die 28 Tage hinaus, verlorene Nummern, Ausweisdokumente und die Frage, ob ein zweites Visum eine neue Nummer braucht.',
      'Sie sind für jemanden geschrieben, der gerade angekommen ist, oder der einen Job angefangen hat und feststellt, dass 45 Prozent statt 15 Prozent vom Lohn abgehen. An der TFN selbst wird fast nie Geld gewonnen oder verloren.',
      'Entscheidend sind das Tax File Number Declaration Formular, das dir dein Arbeitgeber in der ersten Woche gibt, das 28 Tage Fenster, das mit deiner ersten Schicht beginnt und nicht mit dem Antrag, und ob dieser Arbeitgeber beim ATO als Working Holiday Maker Arbeitgeber registriert ist.',
    ],
    service: { path: '/de/tfn', label: 'Was wir bei TFN und Erklärungsformular übernehmen' },
  },
  'abn': {
    paragraphs: [
      'Eine Australian Business Number ist die Nummer, unter der du Rechnungen stellst, wenn ein Betrieb dich als Auftragnehmer bezahlt statt dich anzustellen. Diese Ratgeber behandeln Anmeldung und Abmeldung, GST und die Umsatzgrenze von 75.000 Dollar, Rechnungspflichten, Betriebsausgaben, Fahrtenbücher und wie Rechnungseinkommen neben Lohn in derselben Steuererklärung steht.',
      'Sie sind für alle, die von einer Farm, einer Lieferplattform oder einem Gastrobetrieb aufgefordert wurden, eine ABN zu holen, und für alle, die schon eine haben und nicht sicher sind, was sich dadurch ändert. Zwei Punkte tragen fast alles.',
      'Von einer ABN-Zahlung wird nichts einbehalten und es wird keine Super gezahlt, die Steuer kommt also am Jahresende auf einen Schlag statt nach und nach. Und eingestuft wird nach dem tatsächlichen Ablauf der Arbeit, nicht nach dem Wort auf dem Vertrag. Deshalb ist der Wechsel von der Gehaltsliste zur Rechnungsstellung bei gleicher Arbeit, gleichen Stunden und gleicher Weisung das Erste, was du hier lesen solltest.',
    ],
    service: { path: '/de/abn', label: 'Was wir machen, wenn du über eine ABN abgerechnet hast' },
  },
  'tax-return': {
    paragraphs: [
      'Das australische Steuerjahr läuft vom 1. Juli bis zum 30. Juni, und wer in diesem Zeitraum Einkommen hatte, gibt eine Steuererklärung ab. Diese Ratgeber behandeln Fristen und Strafen, Abzüge und Belege, den steuerlichen Wohnsitz, nachträgliche Korrekturen, die Abgabe nach der Heimreise und das, was die Höhe der Rückerstattung tatsächlich bestimmt.',
      'Das ist die Kategorie für jemanden, der entscheidet, ob er selbst einreicht oder es abgibt. Dein steuerlicher Wohnsitz, der von deinen eigenen Umständen abhängt und ordentlich geprüft werden muss. Die Wochen mit 45 Prozent Einbehalt, bevor die TFN bei der Lohnbuchhaltung war. Die Medicare Frage. Und die Abzüge, die zu deiner tatsächlichen Arbeit gehören. Nichts davon lässt sich in einer Tabelle nachschlagen.',
    ],
    service: { path: '/de/tax-return', label: 'Was wir bei jeder Steuererklärung durchgehen' },
  },
  'super': {
    paragraphs: [
      'Superannuation ist Geld, das dein Arbeitgeber zusätzlich zum Lohn in einen Rentenfonds einzahlt, ab dem 1. Juli 2026 mit 12 Prozent. Wenn du Australien endgültig verlässt, kannst du es über den Departing Australia Superannuation Payment zurückholen. Diese Ratgeber behandeln, wie Super entsteht, wie du den Stand prüfst, wie du verlorene Fonds findest, den DASP Ablauf, die nötigen Unterlagen und die Besteuerung der Auszahlung.',
      'Sie sind für alle am Ende einer Working Holiday, und besonders für alle, die bei mehreren Arbeitgebern gejobbt haben und vermuten, dass das Geld auf mehreren Konten liegt.',
      'Zwei Dinge entscheiden über Betrag und Dauer. Ob vor dem Antrag jedes Konto unter deiner TFN gefunden wurde, denn ein Antrag leert nur die Fonds, die du nennst. Und wann der Antrag im Verhältnis zum Ablauf deines Visums gestellt wird. Die Auszahlung selbst wird bei Working Holiday Makern mit 65 Prozent besteuert. Das ist gesetzlich festgelegt und nicht gestaltbar.',
    ],
    service: { path: '/de/superannuation', label: 'Was wir vor deiner Abreise mit deiner Super machen' },
  },
  'work-rights': {
    paragraphs: [
      'Working Holiday Maker haben in Australien dieselben Rechte am Arbeitsplatz wie alle anderen. Mindestlohn, Zuschläge, Pausen, Urlaub, kurzfristig abgesagte Schichten und Kündigung sind von der Fair Work Commission und vom Award deiner Branche geregelt. Diese Ratgeber behandeln, was dir zusteht, wie du einen Payslip liest, was du tust, wenn die Zahlen nicht stimmen, und welche Zertifikate manche Jobs verlangen.',
      'Sie sind für jemanden mitten in der Saison geschrieben, nicht am Ende. Das meiste hier ist keine Steuerfrage.',
      'Es steht auf dieser Seite, weil dasselbe Jahr zweimal auftaucht: Ein Arbeitgeber, der zu wenig gezahlt hat, bar gezahlt hat oder keine Super abgeführt hat, ist auch ein Arbeitgeber, dessen Einkommensmeldung nicht zu dem passt, was du tatsächlich bekommen hast, und das kommt bei der Steuererklärung wieder hoch.',
    ],
    service: { path: '/de/tax-return', label: 'Was wir bei jeder Steuererklärung durchgehen' },
  },
  'medicare-and-other': {
    paragraphs: [
      'Die Medicare Levy ist eine Abgabe von 2 Prozent auf das zu versteuernde Einkommen und wird standardmäßig abgezogen. Die meisten Inhaber von 417- und 462-Visa haben keinen Anspruch auf Medicare und hätten sie nie zahlen müssen. Diese Ratgeber behandeln, wer anspruchsberechtigt ist und wer nicht, die Länder mit Gesundheitsabkommen, wie die Befreiung beantragt wird, Krankenversicherung während des Aufenthalts und die übrigen Verwaltungsfragen.',
      'Bei 25.000 Dollar Einkommen sind das 500 Dollar. Die Befreiung gibt es nicht automatisch, und das ATO wendet sie nicht von sich aus an.',
      'Sie muss in der Erklärung geltend gemacht werden, und dafür brauchst du ein Medicare Entitlement Statement von Services Australia, das beantragt werden muss und in der Regel Wochen dauert. Ob die Befreiung für dich überhaupt in Frage kommt, entscheidet dein Pass.',
    ],
    service: { path: '/de/medicare', label: 'Was wir bei der Medicare Levy machen' },
  },
}

const cfg: CategoryLocaleConfig = {
  locale: 'de',
  basePath: '/de',
  ogLocale: 'de_DE',
  categoryMeta: deCategoryMeta,
  getCategoryMeta: getGermanCategoryMeta,
  getGuides: getGermanGuides,
  catLabel: catLabelDe,
  categoryIntro: CATEGORY_INTRO,

  metaKeywords: (category) => [
    'Working Holiday Tax Australien',
    category,
    'Working Holiday Visum',
    '417 Visum',
    '462 Visum',
    'WHM Steuer',
  ],
  audienceName: 'Working Holiday Visuminhaber in Australien (Subclass 417 und 462)',

  homeLabel: 'Startseite',
  blogLabel: 'Blog',
  breadcrumbAriaLabel: 'Brotkr\u00fcmelnavigation',
  articleCount: (n) => `${n} Artikel`,
  coversHeading: 'Was diese Kategorie abdeckt und f\u00fcr wen sie ist',
  gridHeading: (label, n) => `Alle ${label}-Artikel (${n})`,
  readTimeLabel: (m) => `${m ?? ''} Min. Lesezeit`,
  readMoreLabel: 'Mehr lesen',
  faqKickerLabel: 'H\u00e4ufige Fragen',
  faqHeading: 'H\u00e4ufig gestellte Fragen',
  otherCategoriesHeading: 'Andere Kategorien',
  allArticlesLabel: 'Alle Artikel \u2192',

  styles: {
    countBadge: (color) => ({ fontSize: '10.5px', letterSpacing: '0.15em', color, textTransform: 'uppercase', fontWeight: 600 }),
    h1: { lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: '720px' },
    introP: { lineHeight: 1.65, maxWidth: '640px' },
    coversHeadingLineHeight: 1.25,
    coversPLineHeight: 1.8,
    cardTitleLineHeight: 1.35,
    cardDescLineHeight: 1.65,
    faqKicker: (color) => ({ fontSize: '10.5px', fontWeight: 700, color, letterSpacing: '0.15em', textTransform: 'uppercase' }),
    faqHeadingLetterSpacing: '-0.025em',
    faqAnswerLineHeight: 1.75,
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return localizedCategoryStaticParams(cfg)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildCategoryMetadata(cfg, (await params).slug)
}

export default async function GermanCategoryPage({ params }: Props) {
  return <LocalizedCategoryPage cfg={cfg} slug={(await params).slug} />
}
