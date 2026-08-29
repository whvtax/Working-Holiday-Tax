import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/(site)/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "Reinigungskraft: Fahrten, Ausrüstung",
  "description": "Ausrüstung, Schutzkleidung, Uniformwäsche zum ATO-Satz und die Fahrt zwischen zwei Jobs, die kaum jemand ansetzt. Dazu, was abgelehnt wird.",
  "keywords": [
    "Reinigungskraft Steuerabzüge Australien",
    "Putzhilfe Steuer Australien",
    "Reinigungsmittel absetzen ATO",
    "Fahrten zwischen Reinigungsjobs absetzen",
    "Uniformwäsche Pauschale ATO",
    "Working Holiday Reinigung Steuer",
    "Airtasker Reinigung Steuer Australien",
    "Büroreinigung Steuerabzüge"
  ],
  "alternates": {
    "canonical": "/de/expenses/cleaners",
    "languages": {
      "en-AU": "/expenses/cleaners",
      "de": "/de/expenses/cleaners",
      "ja": "/ja/expenses/cleaners",
      "x-default": "/expenses/cleaners"
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
    "url": `${SITE_URL}/de/expenses/cleaners`,
    "siteName": "Working Holiday Tax",
    "title": "Reinigung in Australien: Ausrüstung, Wäsche, Fahrten",
    "description": "Die Fahrt zwischen den Häusern ist meist der größte Abzug und der, den fast niemand macht."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Reinigung in Australien: Ausrüstung, Wäsche, Fahrten",
    "description": "Die Fahrt zwischen den Häusern ist meist der größte Abzug und der, den fast niemand macht."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Reinigungsarbeit" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.",
  "guaranteeBody": "Reinigungserklärungen landen hier jede Woche auf dem Tisch, und jede gehört jemandem mit 417- oder 462-Visum. Von einem registrierten Steuerberater geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
  "faqHeading": "Fragen, die uns dazu gestellt werden",
  "guidesHeading": "Danach lesenswert",
  "otherJobs": "Anderer Job? Hier sind alle Berufe.",
  "servicesLabel": "Weiter auf der Website",
  "wrongLabel": "Abgesetzt, obwohl es nicht ging",
  "missedLabel": "Nicht abgesetzt, obwohl es gegangen wäre",
  "disclaimer": "Das sind allgemeine Informationen, keine persönliche Steuerberatung. Was du absetzen kannst, hängt von deinen Arbeitgebern, deinen Belegen und davon ab, wie du tatsächlich gearbeitet hast. Wenn du bei uns einreichst, gehen wir deine Situation Punkt für Punkt durch.",
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
    "name": "Reinigung",
    "item": "/de/expenses/cleaners"
  }
]

const HERO = {
  "kicker": "Häuser, Büros, Endreinigung und App-Jobs",
  "h1lead": "Die Fahrt zwischen den Häusern ist der Abzug.",
  "h1accent": "Fast niemand macht ihn.",
  "lede": "Mittel, Handschuhe und Uniformwäsche zum ATO-Satz stehen auch auf der Liste."
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
    "h2": "Was können Reinigungskräfte absetzen?",
    "paras": [
      "Absetzbar sind selbst gekaufte Ausrüstung und Reinigungsmittel, Schutzausrüstung wie Handschuhe, Schürze, Schutzbrille oder Sicherheitsschuhe, das Waschen einer Pflichtuniform oder von Schutzkleidung und die Fahrt von einem Reinigungsjob zum nächsten am selben Tag. Was Kunde oder Arbeitgeber stellt oder erstattet, fällt raus.",
      "Drei Häuser an einem Tag bedeuten zwei absetzbare Fahrten, und über ein Jahr ist das normalerweise die größte einzelne Zahl der Erklärung."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "Die meiste Reinigungsausrüstung liegt deutlich unter 300 Dollar, wird also im Kaufjahr voll abgesetzt statt langsam abgeschrieben.",
    "items": [
      {
        "t": "Fahrten zwischen Reinigungsjobs",
        "d": "Die Fahrt von einem Haus oder Büro zum nächsten, nachdem dein Tag begonnen hat, ist Fahrt zwischen Arbeitsplätzen und nicht der Arbeitsweg, also absetzbar. Berechnet wird sie mit der Kilometerpauschale oder einem Fahrtenbuch."
      },
      {
        "t": "Ausrüstung und Reinigungsmittel",
        "d": "Mopps, Eimer, Schaber, Tücher, Chemikalien und Verbrauchsmaterial, das du selbst kaufst. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt. Ein zusammen gekauftes Starterset ab 300 Dollar gilt als ein Gegenstand und wird über die Nutzungsdauer verteilt, auch wenn jedes Teil einzeln darunter gelegen hätte."
      },
      {
        "t": "Größere Geräte ab 300 Dollar",
        "d": "Ein Industriestaubsauger, eine Einscheibenmaschine, ein Hochdruckreiniger. Weiterhin absetzbar, verteilt über die Nutzungsdauer statt auf einmal."
      },
      {
        "t": "Schutzausrüstung",
        "d": "Handschuhe, Schürze, Schutzbrille oder Gesichtsschutz bei starken Chemikalien und Staub, Stahlkappen für Baustellen- und Gewerbereinigung. Sie zählen, weil sie dich vor einer Gefahr des Jobs schützen."
      },
      {
        "t": "Waschen absetzbarer Arbeitskleidung",
        "d": "Das Waschen einer Pflichtuniform oder echter Schutzkleidung ist zum ATO-Satz absetzbar: 1 Dollar pro Waschgang, wenn nur Arbeitskleidung drin ist, oder 50 Cent, wenn du sie mit allem anderen wäschst. Über 150 Dollar im Jahr führst du ein einfaches Tagebuch statt zu schätzen."
      },
      {
        "t": "Arbeitsanteil deines Handys",
        "d": "Real für alle, die Buchungen annehmen, eine App nutzen oder mit Kunden über Zugang und Schlüssel schreiben. Setze den arbeitsbezogenen Prozentsatz auf nachvollziehbarer Grundlage an, nicht den ganzen Vertrag."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was muss eine Reinigungskraft aufheben?",
    "paras": [
      "Drei Tests hinter jedem Abzug: du hast bezahlt, dir hat es niemand erstattet, und die Ausgabe diente dazu, das Einkommen zu verdienen, das du angibst. Bei einer Reinigungskraft heißt das Belege für Mittel und Ausrüstung und eine Aufzeichnung der Daten, Adressen und Kilometer hinter den Fahrten.",
      "Ein Beleg, eine Rechnung, ein Kontoauszug oder ein Handyfoto mit Betrag, Datum, Anbieter und Gegenstand zählt jeweils, und alles davon muss fünf Jahre halten. Unter 300 Dollar Abzügen im ganzen Jahr brauchst du gar keinen schriftlichen Nachweis. Das ist nicht die 300-Dollar-Grenze, die entscheidet, wie ein einzelner Staubsauger abgeschrieben wird."
    ]
  },
  {
    "kind": "tables",
    "h2": "Wie werden Autokosten berechnet?",
    "intro": "Zwei Methoden, eine pro Auto und Jahr. Bei einer Reinigungskraft zählen nur die Strecken zwischen den Jobs, nie die Fahrt von zu Hause zum ersten Haus.",
    "tables": [
      {
        "label": "Kilometerpauschale",
        "rows": [
          [
            "Satz 2024-25 und 2025-26",
            "88 Cent pro km"
          ],
          [
            "Satz ab 2026-27",
            "91 Cent pro km"
          ],
          [
            "Maximum",
            "5.000 km pro Auto und Jahr"
          ],
          [
            "Belege",
            "Nicht nötig, aber du musst zeigen, wie du auf die Kilometer kommst"
          ]
        ]
      },
      {
        "label": "Fahrtenbuch",
        "rows": [
          [
            "So funktioniert es",
            "Du setzt den arbeitsbezogenen Prozentsatz aller echten Betriebskosten ab"
          ],
          [
            "Zeitraum",
            "12 zusammenhängende Wochen, fünf Jahre gültig"
          ],
          [
            "Maximum",
            "Keine Grenze. Es folgt deinem tatsächlichen Arbeitsanteil"
          ],
          [
            "Belege",
            "Für jede einzelne Ausgabe erforderlich"
          ]
        ]
      }
    ],
    "note": "Drei oder vier Adressen am Tag knacken die 5.000 Kilometer schneller, als die meisten Reinigungskräfte erwarten, und darüber gewinnt normalerweise das Fahrtenbuch, weil es Benzin, Versicherung, Zulassung, Wartung, Abschreibung und die Zinsen eines Autokredits erfasst."
  },
  {
    "kind": "traps",
    "h2": "Was machen Reinigungskräfte falsch?",
    "intro": "Die falschen Abzüge drehen sich um Kleidung und die erste Fahrt des Tages. Die übersehenen sind fast alle Fahrten.",
    "wrong": [
      {
        "t": "Schlichte schwarze Hose und schlichtes Polo",
        "d": "Auch wenn Kunde oder Agentur auf einer Farbe besteht, bleibt Alltagskleidung privat. Sie wird nicht absetzbar, weil Bleiche sie ruiniert hat."
      },
      {
        "t": "Die erste und die letzte Fahrt des Tages",
        "d": "Von zu Hause zum ersten Job und vom letzten Job nach Hause ist der normale Arbeitsweg. Nur die Strecken dazwischen sind absetzbar, es sei denn, du erfüllst die Ausnahme für sperrige Ausrüstung."
      },
      {
        "t": "Mittel und Geräte, die der Kunde stellt",
        "d": "Wenn im Haus, das du reinigst, die Mittel unter der Spüle stehen oder die Firma die Ausrüstung ausgibt, sind dir keine Kosten geblieben. Dasselbe gilt für alles, was dir erstattet wurde."
      },
      {
        "t": "Eine ABN als Freibrief für alles",
        "d": "Eine ABN macht aus privaten Ausgaben keine Betriebsausgaben. Handy, Auto und Kleidung werden weiterhin aufgeteilt."
      },
      {
        "t": "Anzunehmen, Barzahlungen müsse man nicht angeben",
        "d": "Reinigungseinkommen ist Einkommen, ob es per Überweisung, App-Auszahlung oder im Umschlag kommt."
      }
    ],
    "missed": [
      {
        "t": "Die Fahrten zwischen den Jobs",
        "d": "Reinigungskräfte arbeiten an drei oder vier Adressen am Tag und setzen keine davon ab, weil es sich nicht nach Arbeitsfahrt anfühlt. Notiere Datum, Adressen und Kilometer laufend."
      },
      {
        "t": "Jede Flasche und jedes Tuch einzeln",
        "d": "Verbrauchsmaterial wird ständig gekauft und fast nie belegt. Ein laufendes Fotoalbum der Belege auf dem Handy reicht."
      },
      {
        "t": "Wäsche, zu einem veröffentlichten Satz",
        "d": "Das Waschen von Schutzkleidung und Pflichtuniform ist mit 1 Dollar oder 50 Cent pro Waschgang absetzbar, und fast niemand weiß, dass es diesen Satz gibt."
      },
      {
        "t": "Ausrüstung aus der Aufbauphase",
        "d": "Geräte und Mittel, die du ungefähr zu der Zeit gekauft hast, als du eine ABN registriert und nach Kunden gesucht hast, sind in der Regel absetzbar, auch wenn die erste Rechnung später kam. Eine große Lücke zwischen Kauf und erstem Job schwächt das, also heb die Daten auf."
      },
      {
        "t": "Wochen mit falschem Einbehalt bei einer Reinigungsfirma",
        "d": "Hat eine Firma deine Tax File Number Declaration nie erhalten oder ist sie nicht als Arbeitgeber von Working Holiday Makern registriert, sind weit mehr als 15 Prozent abgeflossen. Das kommt mit der Erklärung zurück und nicht vorher."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was ändert sich je nachdem, für wen du putzt?",
    "paras": [
      "Einzelunternehmer oder Angestellter ist die erste Weiche. Private Hausreinigungen, Endreinigungen und App-Jobs über etwas wie Airtasker sind ABN-Einkommen: du setzt den Preis, du stellst Rechnung, nichts wird einbehalten, es gibt keine Superannuation.",
      "Von einer Reinigungsfirma auf Objekte und Schichten eingeteilt zu werden ist Anstellung mit TFN, mit Einbehalt und Super obendrauf.",
      "Eine Firma, die deinen Dienstplan macht, deine Arbeit beaufsichtigt und die Mittel stellt und dann eine ABN von dir verlangt, kann ein Arbeitgeber im Kostüm der Selbstständigkeit sein.",
      "Für Einzelunternehmer wird die GST erst ab 75.000 Dollar Reinigungsumsatz im Jahr Pflicht, und dahin kommt Teilzeitreinigung selten.",
      "Unter allem liegt der steuerliche Wohnsitz, mehr wert als die ganze Abzugsliste: britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich die Fahrt zwischen zwei Reinigungsjobs absetzen?",
    "answer": "Ja. Die Fahrt von einem Reinigungsjob zum nächsten am selben Tag ist eine Fahrt zwischen Arbeitsplätzen und kein Arbeitsweg, also absetzbar über die Kilometerpauschale oder ein Fahrtenbuch.\n\nNicht absetzbar sind die erste Fahrt von zu Hause zum ersten Job und die letzte nach Hause, es sei denn, du transportierst sperrige Ausrüstung, die an keinem der Orte sicher gelagert werden kann."
  },
  {
    "question": "Welche Ausrüstung und welche Mittel kann ich absetzen?",
    "answer": "Alles, was du selbst gekauft hast und nicht erstattet bekommen hast: Mopps, Eimer, Schaber, Tücher, Chemikalien und Verbrauchsmaterial.\n\nGegenstände bis 300 Dollar pro Stück werden im Kaufjahr voll abgesetzt. Größere Geräte wie ein Industriestaubsauger oder eine Einscheibenmaschine sind ebenfalls absetzbar, verteilt über die Nutzungsdauer."
  },
  {
    "question": "Kann ich Uniform und Waschen absetzen?",
    "answer": "Du kannst eine vorgeschriebene Uniform absetzen, die Arbeitgeber oder Kunde nicht stellt, und Schutzausrüstung mit echter Sicherheitsfunktion wie Handschuhe, Schürze, Schutzbrille oder Stahlkappen. Nicht absetzbar sind schlichte schwarze Hosen oder ein schlichtes Polo.\n\nDas Waschen absetzbarer Arbeitskleidung geht mit 1 Dollar pro reinem Arbeitswaschgang oder 50 Cent gemischt, mit einfachem Tagebuch ab 150 Dollar im Jahr."
  },
  {
    "question": "Muss ich mich als Reinigungskraft mit ABN für die GST registrieren?",
    "answer": "Erst wenn dein Umsatz aus der Reinigungsarbeit 75.000 Dollar im Jahr überschreitet. Das ist die allgemeine Grenze für Einzelunternehmer und keine Sonderregel für Reinigung, und die meisten, die in Teilzeit, privat oder über eine App putzen, kommen nicht in die Nähe. Darunter stellst du einfach Rechnungen ohne GST-Zeile."
  },
  {
    "question": "Bin ich Einzelunternehmer oder Angestellter?",
    "answer": "Es entscheidet, wer die Arbeit verteilt. Kunden, die du selbst gefunden hast, Endreinigungen und App-Buchungen laufen fast immer als Einzelunternehmer über eine ABN.\n\nTeilt dir eine Reinigungsfirma Objekte und Schichten zu, bist du fast immer angestellt.\n\nDer Vertrag entscheidet es nicht, die tatsächlichen Umstände entscheiden es, und wenn du beides gemacht hast, gehört beides in dieselbe Erklärung."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/abn-deductions-business-expenses",
    "label": "Betriebsausgaben, wenn du mit ABN arbeitest",
    "desc": "Was ein Einzelunternehmer absetzen kann und wo die Grenze liegt."
  },
  {
    "href": "/de/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "Die 300-Dollar-Sofortabschreibung für Werkzeug und Ausrüstung",
    "desc": "Warum jedes Teil einzeln geprüft wird und was ein Set daran ändert."
  },
  {
    "href": "/de/blog/tax-deductions-working-holiday-makers",
    "label": "Absetzbare Kosten für Working Holiday Maker: die vollständige Liste",
    "desc": "Alle Kategorien, und was das ATO ablehnt."
  }
]

const SERVICES = [
  {
    "href": "/de/abn",
    "label": "ABN"
  },
  {
    "href": "/de/tfn",
    "label": "TFN"
  },
  {
    "href": "/de/tax-return",
    "label": "Steuererklärung"
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
  headline: "Reinigung in Australien: Ausrüstung, Wäsche, Fahrten",
  description: "Die Fahrt zwischen den Häusern ist meist der größte Abzug und der, den fast niemand macht.",
  url: `${SITE_URL}/de/expenses/cleaners`,
  inLanguage: "de-DE",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/expenses/cleaners#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/expenses/cleaners`,
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
  margin: '0 0 16px',
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
                  {s.body.split('\n\n').map((para, j, arr) => (
                    <p key={j} style={{ ...ps, margin: j === arr.length - 1 ? 0 : ps.margin }}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '16px' }}>{UI.guaranteeHeading}</h2>
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
                {/* Am Absatzumbruch geteilt, damit eine lange Antwort als zwei
                    kurze Absätze liest. faqSchema nutzt weiter den Rohtext. */}
                {f.answer.split('\n\n').map((para, j, arr) => (
                  <p key={j} style={{ ...ps, margin: j === arr.length - 1 ? 0 : ps.margin }}>{para}</p>
                ))}
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
