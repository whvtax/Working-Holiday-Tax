import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "Gastronomie: Schuhe, Kochjacke, Wäsche",
  "description": "RSA-Verlängerung, rutschfeste Schuhe, Kochjacke und Uniformwäsche. Dazu, warum das schwarze Outfit keine Uniform ist und was Trinkgeld bedeutet.",
  "keywords": [
    "Gastronomie Steuerabzüge Australien",
    "Kellner absetzen Australien",
    "Barkeeper Steuer Australien",
    "Koch Steuerabzüge Australien",
    "RSA Zertifikat absetzbar",
    "Arbeitsschuhe absetzen ATO",
    "Trinkgeld steuerpflichtig Australien",
    "Working Holiday Gastronomie Steuer"
  ],
  "alternates": {
    "canonical": "/de/expenses/hospitality",
    "languages": {
      "en-AU": "/expenses/hospitality",
      "de": "/de/expenses/hospitality",
      "ja": "/ja/expenses/hospitality",
      "x-default": "/expenses/hospitality"
    }
  },
  "openGraph": {
    "images": [
      {
        "url": `${SITE_URL}/og-image.png`,
        "width": 1200,
        "height": 630,
        "alt": "Working Holiday Tax"
      }
    ],
    "type": "website",
    "locale": "de_DE",
    "url": `${SITE_URL}/de/expenses/hospitality`,
    "siteName": "Working Holiday Tax",
    "title": "Gastronomie in Australien: was du absetzen kannst",
    "description": "Rutschfeste Schuhe und Kochjacke sind absetzbar. Das schwarze Outfit, auf dem dein Betrieb besteht, nicht."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Gastronomie in Australien: was du absetzen kannst",
    "description": "Rutschfeste Schuhe und Kochjacke sind absetzbar. Das schwarze Outfit, auf dem dein Betrieb besteht, nicht."
  },
  "robots": {
    "index": true,
    "follow": true,
    "googleBot": {
      "index": true,
      "follow": true,
      "max-snippet": -1,
      "max-image-preview": "large"
    }
  }
}

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Gastronomie, Bar und Küche" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Reicht die Rückerstattung nicht bis an unser Honorar, bekommst du die Differenz zurück.",
  "guaranteeBody": "Vier Betriebe, vier Income Statements und Super in vier Fonds ist hier das übliche Gastro-Jahr, und jeder Kunde ist auf einem 417 oder 462. Von einem registrierten Steuerberater geprüft und freigegeben, bevor es zum ATO geht.",
  "faqHeading": "Fragen, die uns dazu gestellt werden",
  "guidesHeading": "Danach lesenswert",
  "otherJobs": "Anderer Job? Hier sind alle Berufe.",
  "servicesLabel": "Weiter auf der Website",
  "wrongLabel": "Abgesetzt, obwohl es nicht ging",
  "missedLabel": "Nicht abgesetzt, obwohl es gegangen wäre",
  "disclaimer": "Das sind allgemeine Informationen, keine persönliche Steuerberatung. Was du absetzen kannst, hängt von deinen Arbeitgebern, deinen Belegen und davon ab, wie du tatsächlich gearbeitet hast. Wenn du bei uns einreichst, gehen wir deine Situation Punkt für Punkt durch, damit du alles absetzt, was dir zusteht, und nichts, was dir nicht zusteht.",
  "hubHref": "/de/expenses"
}

const CRUMBS = [
  {
    "name": "Startseite",
    "item": "/de"
  },
  {
    "name": "Abzüge",
    "item": "/de/expenses"
  },
  {
    "name": "Gastronomie",
    "item": "/de/expenses/hospitality"
  }
]

const HERO = {
  "kicker": "Bars, Cafes, Restaurants und Küchen",
  "h1lead": "Deine rutschfesten Schuhe sind absetzbar.",
  "h1accent": "Das schwarze Outfit nicht.",
  "lede": "Die Liste ist kurz, deshalb liegt das Geld einer Gastro-Erklärung meistens auf der Einkommensseite: mehrere Betriebe, mehrere Einbehaltssätze, Super in mehreren Fonds."
}

type Section =
  | { kind: 'answer'; h2: string; paras: string[] }
  | { kind: 'items'; h2: string; intro: string; items: { t: string; d: string }[] }
  | { kind: 'traps'; h2: string; intro: string; wrong: { t: string; d: string }[]; missed: { t: string; d: string }[] }
  | { kind: 'numbered'; h2: string; intro: string; steps: string[]; note?: string }
  | { kind: 'tables'; h2: string; intro: string; tables: { label: string; rows: string[][] }[]; note?: string }
  | { kind: 'occupations'; h2: string; intro: string; jobs: { href: string; title: string; line: string }[] }
  | { kind: 'note'; label: string; title: string; body: string }

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Was können Bar-, Cafe- und Küchenkräfte absetzen?",
    "paras": [
      "Absetzbar sind rutschfeste Schutzschuhe, berufsspezifische Kleidung wie Kochjacke und Karohose, das Waschen einer Pflichtuniform mit Arbeitgeberlogo, die Verlängerung eines RSA- oder Food-Safety-Supervisor-Zertifikats und selbst gekauftes Küchenwerkzeug. Alles andere im Schrank ist normale Kleidung.",
      "Die Liste ist kurz, weil dir die Gastronomie sehr wenig gibt, das nur zu diesem Job gehört. Du bist drinnen, dein Arbeitgeber stellt die Ausrüstung, und die Kleidung, die ein Betrieb verlangt, könnte meist jeder überall tragen. Der Wert einer Gastro-Steuererklärung steckt öfter auf der Einnahmenseite, im Einbehalt über mehrere Arbeitgeber, als in den Abzügen."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "Bei Kleidung kommt zu den allgemeinen Tests ein zusätzlicher dazu, und dort entsteht fast jeder Streit in der Gastronomie.",
    "items": [
      {
        "t": "Rutschfeste, geschlossene Schutzschuhe",
        "d": "Absetzbar, wenn du sie brauchst: nasser Boden hinter der Bar, Spritzer an der Kaffeemaschine, heiße Teller quer durch den Pass. Sie gelten als Schutzschuhe und nicht als normale Schuhe, weil sie eine konkrete Sicherheitsaufgabe erfüllen, und das bleibt so, welche Farbe sie auch haben."
      },
      {
        "t": "Kochjacke und karierte Kochhose",
        "d": "Berufsspezifische Kleidung, also Kleidung, die dich als Angehörigen eines bestimmten Berufs erkennbar macht und überall sonst absurd aussähe. Das ist eine eigene anerkannte Kategorie, getrennt von der Uniform mit Logo, und genau deshalb bekommt ein Koch einen Kleidungsabzug und ein Kellner meistens nicht."
      },
      {
        "t": "Waschen einer Pflichtuniform mit Logo",
        "d": "Verlangt dein Arbeitgeber eine Uniform mit Logo oder wirklich unverwechselbarem Design, ist das Waschen absetzbar: 1 Dollar pro Waschgang, wenn nur Arbeitskleidung drin ist, oder 50 Cent, wenn du sie mit allem anderen wäschst. Über 150 Dollar Wäschekosten im Jahr brauchst du ein einfaches Tagebuch statt einer Schätzung."
      },
      {
        "t": "Verlängerung von RSA oder Food Safety Supervisor",
        "d": "Die Verlängerung eines Zertifikats, das du schon hast, während du bereits in der Rolle arbeitest, ist absetzbar. Das gilt für RSA und Food Safety Supervisor gleichermaßen, und immer nur für die Verlängerung."
      },
      {
        "t": "Selbst gekaufte Messer und Küchenwerkzeuge",
        "d": "Messerrolle, eigene Kochmesser, Thermometer, Mandoline. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt. Ein gemeinsam gekauftes Set ab 300 Dollar gilt als ein Gegenstand und wird über die Nutzungsdauer verteilt, auch wenn jedes einzelne Teil darunter gelegen hätte."
      },
      {
        "t": "Schürzen, Handschuhe und Schutzausrüstung",
        "d": "Hitzebeständige Handschuhe, schnittfeste Handschuhe, Schutzschürze. Absetzbar, wenn sie dich vor einer Gefahr des Jobs schützen und dein Arbeitgeber sie weder gestellt noch erstattet hat."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was muss hinter einem Abzug in der Gastronomie stehen?",
    "paras": [
      "Dieselben drei Tests wie überall: das Geld war deins, niemand hat es dir erstattet, und es diente dazu, das Einkommen zu verdienen, das du angibst. Im Betrieb heißt das der Beleg für die Schuhe und die Messerrolle, die schriftliche Uniformregel und ein Wäschetagebuch, sobald sich die Waschgänge summieren.",
      "Jeder Nachweis mit Betrag, Datum, Anbieter und Gegenstand tut es, ob Beleg, Rechnung, Kontoauszug oder Foto auf dem Handy, und er muss fünf Jahre überstehen. Ein Jahr mit Abzügen von zusammen 300 Dollar oder weniger braucht gar keinen schriftlichen Nachweis, die Zahl musst du trotzdem begründen können. Andere 300 Dollar als die, die entscheiden, ob ein Messerset sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "traps",
    "h2": "Was macht Gastro-Personal falsch?",
    "intro": "Die Kleidungsregel erwischt alle, und sie erwischt sie, weil sie sich unfair anfühlt. Die übersehenen Abzüge sind leiser und drehen sich meist um die Bezahlung statt um Ausgaben.",
    "wrong": [
      {
        "t": "Das komplett schwarze Outfit, das der Betrieb verlangt",
        "d": "Schlichte schwarze Hose, schlichtes schwarzes Hemd, schlichte schwarze Schuhe ohne Logo. Du besitzt sie nur wegen der Arbeit, hättest sie nie gewählt, und ohne sie schickt dich der Chef heim. Nichts davon zählt. Das ATO schaut auf den Gegenstand, und Alltagskleidung, die jeder überall tragen könnte, ist privat, was der Dresscode auch sagt."
      },
      {
        "t": "Deine erste RSA",
        "d": "Das Zertifikat, das du vor dem Job bezahlt hast, hat dich einstellbar gemacht, und das ist eine private Kost. Sobald du arbeitest und es zum Weiterarbeiten verlängert werden muss, ist die Verlängerung absetzbar. Dasselbe Zertifikat, andere Antwort, je nachdem auf welcher Seite deiner ersten Schicht es liegt."
      },
      {
        "t": "Friseur, Pflege und Make-up für den Standard im Service",
        "d": "Körperpflege bleibt privat, auch wenn ein Betrieb dafür schriftliche Vorgaben hat. Es gibt keine Version eines Haarschnitts, die in der Gastronomie eine Arbeitskost wäre."
      },
      {
        "t": "Das Essen in der Schicht oder das Feierabendbier",
        "d": "Personalessen und Getränke danach sind privat, ob du bezahlt hast, Rabatt bekommen hast oder es geschenkt bekommen hast. Bei der Arbeit zu sein, während du isst, macht Essen nicht absetzbar."
      },
      {
        "t": "Bar-Trinkgeld, das nicht in der Erklärung steht",
        "d": "Das läuft in die andere Richtung. Trinkgeld, das dir direkt in die Hand gegeben wird, ist steuerpflichtiges Einkommen, auch wenn es niemand erfasst. Gepooltes Trinkgeld und Servicezuschläge über die Lohnabrechnung stehen schon im Income Statement, aber Bargeld musst du selbst angeben, und das ist keine Option."
      }
    ],
    "missed": [
      {
        "t": "Uniformwäsche, das ganze Jahr",
        "d": "Ein paar Dollar pro Woche, die fast niemand ansetzt, weil niemand auf die Idee kommt, dass ein gewaschenes Hemd eine Steuersache ist. Über ein Jahr Schichten ist das eine echte Zahl, und das ATO veröffentlicht den Satz, da muss nichts geschätzt werden."
      },
      {
        "t": "Die rutschfesten Schuhe, weil \"Kleidung geht ja nicht\"",
        "d": "Leute lesen völlig richtig, dass Gastro-Kleidung nicht absetzbar ist, und übertragen das dann falsch auf Schutzschuhe. Schutzschuhe sind eine eigene Kategorie und absetzbar."
      },
      {
        "t": "Ein zweiter oder dritter Arbeitgeber mit falschem Einbehalt",
        "d": "Hat ein Betrieb deine Tax File Number Declaration nie bekommen oder ist er nicht als Arbeitgeber von Working Holiday Makern registriert, behält er weit mehr als 15 Prozent ein. Nichts davon ist verloren, aber es kommt erst mit einer Erklärung zurück, die alle Arbeitgeber zusammenführt."
      },
      {
        "t": "Superannuation in drei verschiedenen Fonds",
        "d": "Jeder Betrieb zahlt ab dem ersten Dollar 12 Prozent Super zusätzlich zum Lohn, ohne monatliche Mindestgrenze. Bei vier Casual-Jobs endest du mit vier Konten, jedes mit eigenen Gebühren, und die meisten finden nur eines davon wieder."
      },
      {
        "t": "Ein Betrieb, der dir die Uniform unrechtmäßig vom Lohn abgezogen hat",
        "d": "Kein Abzug. Lohnabzüge für Uniformen, Wäsche, Bruch oder Kassendifferenzen sind nach dem Fair Work Act fast immer rechtswidrig, und das ist Geld zurück, keine Steuersache."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was muss beurteilt statt nachgeschlagen werden?",
    "paras": [
      "Zuerst die Kleidungsfrage. Ob ein Teil eine Pflichtuniform ist, hängt daran, wie unverwechselbar es ist und ob der Arbeitgeber es verlangt. Ob Schuhe Schutzschuhe sind, hängt an der Gefahr in deinem Betrieb. Eine schriftliche Uniformregel und ein Foto des Teils klären das meistens.",
      "Auf der Einnahmenseite zahlt sich ein fachlicher Blick aus. Working Holiday Maker bekommen keinen Steuerfreibetrag, also lautet die Antwort auf diese Frage in jeder Tax File Number Declaration, bei jedem Betrieb, Nein. Das kippt, wenn die Addy-Entscheidung für dich gilt, was bei britischen, deutschen und japanischen Pässen möglich ist, sofern du steuerlich in Australien ansässig warst. Drei Casual-Jobs, eine Ankunft mitten im Jahr und eine feste Adresse machen daraus eine offene Frage."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich meine schwarzen Arbeitsschuhe und die Hose absetzen?",
    "answer": "Schlichte schwarze Kleidung ohne Logo ist nicht absetzbar, auch wenn der Dresscode des Betriebs sie vorschreibt, weil das ATO sie als gewöhnliche Kleidung und nicht als Uniform behandelt. Rutschfeste geschlossene Schuhe sind etwas anderes: Wenn du sie für einen nassen Boden hinter der Bar oder einen vollen Küchenpass brauchst, gelten sie als Schutzschuhe und sind unabhängig von der Farbe absetzbar."
  },
  {
    "question": "Kann ich mein RSA-Zertifikat absetzen?",
    "answer": "Die Verlängerung ja, das erste Zertifikat nein. Sobald du in einer Rolle arbeitest, die eine RSA verlangt, ist ihre Verlängerung eine Kost der Arbeit. Das erste Zertifikat lag davor und hat dich überhaupt erst für die Stelle qualifiziert, und das behandelt das ATO als privat. Für den Food Safety Supervisor und den ersten Führerschein zieht sie dieselbe Grenze."
  },
  {
    "question": "Ist mein Trinkgeld steuerpflichtig?",
    "answer": "Ja, alles davon. Trinkgeld und Servicezuschläge, die über die Lohnabrechnung ausgezahlt werden, auch aus einem Pool oder Tronc, sind Teil deines Lohns, schon versteuert und schon im Income Statement. Bargeld, das dir direkt gegeben wird, ist genauso steuerpflichtig, wird aber von niemandem erfasst. Du führst eine einfache laufende Notiz und gibst die Summe selbst an."
  },
  {
    "question": "Ich arbeite in drei Betrieben. Was schreibe ich in jede TFN Declaration?",
    "answer": "Jeder Arbeitgeber braucht eine eigene Tax File Number Declaration, weil deine TFN bei einem neuen Job nicht automatisch mitkommt. Auf jeder wählst du Working Holiday Maker als Status und beantwortest die Frage nach dem Steuerfreibetrag mit Nein, bei jedem Betrieb, auch bei dem, der am besten zahlt. Working Holiday Maker bekommen von keinem Arbeitgeber einen Steuerfreibetrag, und ein Ja irgendwo führt zu zu wenig Einbehalt und später zu einer Nachzahlung."
  },
  {
    "question": "Bekomme ich Superannuation in einem Casual-Job?",
    "answer": "Ja. Dein Arbeitgeber zahlt für Casual-Arbeit ab dem ersten Dollar 12 Prozent Super zusätzlich zum Lohn, ohne monatliche Mindestverdienstgrenze. Jeder Betrieb zahlt unabhängig, bei mehreren Jobs verteilt sich das also meist auf mehrere Fonds, und die solltest du aufspüren, bevor du Australien verlässt."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/hospitality-award-working-holiday-makers",
    "label": "Der Hospitality Award und was dir zusteht",
    "desc": "Casual Loading, Zuschläge und wo Betriebe es falsch machen."
  },
  {
    "href": "/de/blog/uniform-laundry-deductions-illegal-australia",
    "label": "Uniform- und Wäschekosten vom Lohn abgezogen",
    "desc": "Wann ein Lohnabzug rechtswidrig ist und wie du das Geld zurückholst."
  },
  {
    "href": "/de/blog/tax-deductions-working-holiday-makers",
    "label": "Absetzbare Kosten für Working Holiday Maker: die vollständige Liste",
    "desc": "Alle Kategorien, und was das ATO ablehnt."
  }
]

const SERVICES = [
  {
    "href": "/de/tax-return",
    "label": "Steuererklärung"
  },
  {
    "href": "/de/tfn",
    "label": "TFN"
  },
  {
    "href": "/de/superannuation",
    "label": "Superannuation"
  }
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: CRUMBS.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.name,
    item: `${SITE_URL}${b.item === '/' ? '' : b.item}`,
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Gastronomie in Australien: was du absetzen kannst",
  description: "Rutschfeste Schuhe und Kochjacke sind absetzbar. Das schwarze Outfit, auf dem dein Betrieb besteht, nicht.",
  url: `${SITE_URL}/de/expenses/hospitality`,
  inLanguage: "de-DE",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/expenses/hospitality#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/expenses/hospitality`,
}

/* Tokens kept local so this page does not depend on shared CSS being finished. */
const INK = '#080F0D'
const BODY = '#2A3C34'
const MUTED = '#4C6459'
const FOREST = '#0B5240'
const HAIR = '#E2EFE9'
const SUNKEN = '#F5F9F7'
const WARN = '#B54708'

const wrap: React.CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '0 20px' }
const h2s: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(23px, 5.6vw, 30px)',
  lineHeight: 1.22,
  letterSpacing: '-0.02em',
  fontWeight: 700,
  color: INK,
  margin: '0 0 14px',
}
const h3s: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: 1.35,
  fontWeight: 700,
  color: INK,
  margin: '0 0 6px',
}
const ps: React.CSSProperties = { fontSize: '15px', lineHeight: 1.62, color: BODY, margin: '0 0 14px' }
const secLight: React.CSSProperties = { background: '#fff', padding: '34px 0' }
const secSunk: React.CSSProperties = { background: SUNKEN, padding: '34px 0' }
const kickerS: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: FOREST,
  margin: '0 0 10px',
}

function Cta({ position }: { position: 'hero' | 'inline' | 'section' }) {
  return (
    <div style={{ margin: '18px 0 0' }}>
      <WaLink
        href={WA}
        position={position}
        topic="expenses"
        lang={"de"}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '52px',
          padding: '0 28px',
          background: FOREST,
          color: '#fff',
          borderRadius: '999px',
          fontSize: '16px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        {UI.ctaLabel}
      </WaLink>
      <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: MUTED, margin: '10px 0 0', textAlign: 'center' }}>
        {UI.ctaSub}
      </p>
    </div>
  )
}

function Bullets({ label, colour, items }: { label: string; colour: string; items: { t: string; d: string }[] }) {
  return (
    <div style={{ marginTop: '22px' }}>
      <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: colour, margin: '0 0 12px' }}>
        {label}
      </p>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '13px 0' }}>
          <p style={h3s}>{it.t}</p>
          <p style={{ ...ps, margin: 0 }}>{it.d}</p>
        </div>
      ))}
    </div>
  )
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main style={{ background: '#fff' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(160deg,#fff 0%,#F2FAF7 100%)', paddingTop: '68px' }}>
          <div style={{ ...wrap, paddingTop: '18px', paddingBottom: '34px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '18px' }}>
              <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', margin: 0, padding: 0, fontSize: '13px', color: MUTED }}>
                {CRUMBS.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>}
                    {i === CRUMBS.length - 1 ? (
                      <span aria-current="page" style={{ color: FOREST, fontWeight: 500 }}>{b.name}</span>
                    ) : (
                      <Link href={b.item} style={{ color: MUTED, minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>{b.name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <p style={kickerS}>{HERO.kicker}</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(30px, 8.2vw, 46px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                fontWeight: 700,
                color: INK,
                margin: '0 0 14px',
              }}
            >
              {HERO.h1lead}{' '}
              <span style={{ color: FOREST, fontStyle: 'italic' }}>{HERO.h1accent}</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: '16.5px', lineHeight: 1.6, color: BODY, margin: 0 }}>
              {HERO.lede}
            </p>
            <Cta position="hero" />
          </div>
        </section>

        {/* BODY SECTIONS */}
        {SECTIONS.map((s, i) => (
          <section key={i} style={i % 2 === 0 ? secLight : secSunk}>
            <div style={wrap}>
              {s.kind === 'answer' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  {s.paras.map((p, j) => (
                    <p key={j} style={{ ...ps, margin: j === s.paras.length - 1 ? 0 : ps.margin }}>{p}</p>
                  ))}
                </>
              )}

              {s.kind === 'items' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  {s.items.map((it, j) => (
                    <div key={j} style={{ borderTop: `1px solid ${HAIR}`, padding: '15px 0' }}>
                      <p style={h3s}>{it.t}</p>
                      <p style={{ ...ps, margin: 0 }}>{it.d}</p>
                    </div>
                  ))}
                </>
              )}

              {s.kind === 'traps' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={{ ...ps, margin: 0 }}>{s.intro}</p>
                  <Bullets label={UI.wrongLabel} colour={WARN} items={s.wrong} />
                  <Bullets label={UI.missedLabel} colour={FOREST} items={s.missed} />
                </>
              )}

              {s.kind === 'numbered' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.steps.map((t, j) => (
                      <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '14px 16px' }}>
                        <span aria-hidden="true" style={{ flex: '0 0 26px', width: '26px', height: '26px', borderRadius: '999px', background: FOREST, color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j + 1}</span>
                        <span style={{ fontSize: '15px', lineHeight: 1.55, color: BODY }}>{t}</span>
                      </li>
                    ))}
                  </ol>
                  {s.note && <p style={{ ...ps, marginTop: '16px', marginBottom: 0 }}>{s.note}</p>}
                </>
              )}

              {s.kind === 'tables' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {s.tables.map((t, j) => (
                      <div key={j} style={{ background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '14px', overflow: 'hidden' }}>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: FOREST, margin: 0, padding: '13px 16px', borderBottom: `1px solid ${HAIR}` }}>{t.label}</p>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                              {t.rows.map((r, k) => (
                                <tr key={k} style={{ borderTop: k ? `1px solid ${HAIR}` : 'none' }}>
                                  <th scope="row" style={{ textAlign: 'left', fontSize: '13.5px', fontWeight: 600, color: INK, padding: '11px 16px', width: '46%' }}>{r[0]}</th>
                                  <td style={{ fontSize: '13.5px', color: BODY, padding: '11px 16px' }}>{r[1]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                  {s.note && <p style={{ ...ps, marginTop: '16px', marginBottom: 0 }}>{s.note}</p>}
                </>
              )}

              {s.kind === 'occupations' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.jobs.map((jb, j) => (
                      <Link key={j} href={jb.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                        <span style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: FOREST, marginBottom: '4px' }}>{jb.title}</span>
                        <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{jb.line}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {s.kind === 'note' && (
                <div style={{ background: '#FDF0D5', border: '1px solid #F9D88A', borderLeft: '4px solid #E9A020', borderRadius: '12px', padding: '18px 18px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: WARN, margin: '0 0 8px' }}>{s.label}</p>
                  <p style={{ ...h3s, marginBottom: '8px' }}>{s.title}</p>
                  <p style={{ ...ps, margin: 0 }}>{s.body}</p>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '12px' }}>{UI.guaranteeHeading}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.62, color: 'rgba(255,255,255,0.78)', margin: 0 }}>
              {UI.guaranteeBody}
            </p>
            <div style={{ marginTop: '18px' }}>
              <WaLink
                href={WA}
                position="section"
                topic="expenses"
                lang={"de"}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '52px',
                  padding: '0 28px',
                  background: '#E9A020',
                  color: '#1A2822',
                  borderRadius: '999px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {UI.ctaLabel}
              </WaLink>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)', margin: '10px 0 0', textAlign: 'center' }}>
                {UI.ctaSub}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>{UI.faqHeading}</h2>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '16px 0' }}>
                <h3 style={{ ...h3s, marginBottom: '8px' }}>{f.question}</h3>
                <p style={{ ...ps, margin: 0 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GUIDES */}
        <section style={secSunk}>
          <div style={wrap}>
            <h2 style={h2s}>{UI.guidesHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {GUIDES.map((g, i) => (
                <Link key={i} href={g.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: FOREST, marginBottom: '3px' }}>{g.label}</span>
                  <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{g.desc}</span>
                </Link>
              ))}
            </div>

            <p style={{ ...kickerS, marginTop: '24px' }}>{UI.servicesLabel}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICES.map((s, i) => (
                <Link key={i} href={s.href} style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 16px', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '999px', fontSize: '15px', fontWeight: 600, color: FOREST, textDecoration: 'none' }}>
                  {s.label}
                </Link>
              ))}
            </div>
            <p style={{ ...ps, marginTop: '18px', marginBottom: 0 }}>
              <Link href={UI.hubHref} style={{ color: FOREST, textDecoration: 'underline' }}>{UI.otherJobs}</Link>
            </p>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section style={{ ...secLight, paddingBottom: '52px' }}>
          <div style={wrap}>
            <p style={{ fontSize: '13.5px', lineHeight: 1.62, color: MUTED, margin: 0 }}>{UI.disclaimer}</p>
          </div>
        </section>

      </main>

      <MobileCta href={WA} lang={"de"} topic="expenses" />
    </>
  )
}
