import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "Lieferfahrer: Kilometer, Handy, GST",
  "description": "Uber Eats, DoorDash, Menulog, Amazon Flex: Auto- und Fahrradkosten, Arbeitsanteil am Handy, Taschen. Dazu die GST-Regel ab dem ersten Fahrgast.",
  "keywords": [
    "Lieferfahrer Steuerabzüge Australien",
    "Uber Eats Steuer Working Holiday",
    "DoorDash Steuer Australien",
    "Essenslieferung Steuer absetzen",
    "Kilometerpauschale Lieferfahrer",
    "Lieferfahrer ABN Working Holiday",
    "GST Rideshare Australien",
    "Fahrrad Lieferdienst absetzen"
  ],
  "alternates": {
    "canonical": "/de/expenses/delivery-drivers",
    "languages": {
      "en-AU": "/expenses/delivery-drivers",
      "de": "/de/expenses/delivery-drivers",
      "ja": "/ja/expenses/delivery-drivers",
      "x-default": "/expenses/delivery-drivers"
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
    "url": `${SITE_URL}/de/expenses/delivery-drivers`,
    "siteName": "Working Holiday Tax",
    "title": "Lieferfahrer Australien: Auto, Handy, GST absetzen",
    "description": "Deine Kilometer und der Arbeitsanteil am Handy sind das ganze Spiel. Bußgelder und Privatfahrten waren es nie."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Lieferfahrer Australien: Auto, Handy, GST absetzen",
    "description": "Deine Kilometer und der Arbeitsanteil am Handy sind das ganze Spiel. Bußgelder und Privatfahrten waren es nie."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Lieferdienst und Rideshare" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.",
  "guaranteeBody": "Fahrer auf Lieferplattformen mit 417- und 462-Visum sind ein großer Teil unserer Arbeit, deshalb sind die Fahrtenbuchfrage und die GST-Zeile geklärt, bevor die Erklärung geschrieben wird. Von einem registrierten Steuerberater geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
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
    "name": "Lieferdienste",
    "item": "/de/expenses/delivery-drivers"
  }
]

const HERO = {
  "kicker": "Uber Eats, DoorDash, Menulog, Amazon Flex",
  "h1lead": "Deine Kilometer sind der Abzug.",
  "h1accent": "Fast alles andere ist klein.",
  "lede": "Kilometerpauschale oder Fahrtenbuch, eins davon pro Auto und Jahr. Die falsche Wahl ist der teuerste Fehler in diesem Job."
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
    "h2": "Was können Lieferfahrer und Radkuriere absetzen?",
    "paras": [
      "Absetzbar sind der arbeitsbezogene Anteil an Auto, Fahrrad oder Roller, der arbeitsbezogene Anteil an Handy und Datenvolumen, Parkgebühren während der Arbeit, die Reinigung eines Fahrzeugs, das Essen transportiert, und Ausrüstung für den Job wie Thermotasche, Handyhalter, Helm oder Warnweste. Der private Anteil bleibt außen vor.",
      "Fast der gesamte Wert steckt im Fahrzeug. Wer regelmäßig fährt, sammelt Kilometer, die kein anderer Backpacker-Job erzeugt, und über ein Jahr ist der Unterschied zwischen den beiden Berechnungsmethoden häufig größer als alle übrigen Abzüge zusammen."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "Alles hier wird aufgeteilt. Du setzt den Arbeitsanteil ab und brauchst eine nachvollziehbare Grundlage für den Prozentsatz.",
    "items": [
      {
        "t": "Betriebskosten des Autos",
        "d": "Berechnet über die Kilometerpauschale oder ein Fahrtenbuch, unten verglichen. Das Fahrtenbuch rechnet mit deinen echten Betriebskosten zum Arbeitsanteil, die Kilometerpauschale mit einem festen Satz."
      },
      {
        "t": "Kosten für Fahrrad, E-Bike und Roller",
        "d": "Betriebs-, Reparatur- und Wartungskosten sind zum Arbeitsanteil absetzbar, dazu Helm, Warnkleidung und Licht. Fahrräder und Roller sind steuerlich keine Autos, also gilt die Kilometerpauschale für sie nicht und du setzt anteilige tatsächliche Kosten an."
      },
      {
        "t": "Arbeitsanteil an Handy und Daten",
        "d": "Der ganze Job läuft über eine App, also ist der berufliche Prozentsatz deines Vertrags ein echter Abzug: Fahrer-App, Navigation, Nachrichten zu Bestellungen. Ermittle den Prozentsatz ehrlich über einen repräsentativen Zeitraum."
      },
      {
        "t": "Parkgebühren während der Arbeit",
        "d": "Die fünf Dollar im Einkaufszentrum, während eine Bestellung gepackt wird, sind absetzbar. Bußgelder nie."
      },
      {
        "t": "Ausrüstung für den Job",
        "d": "Thermotasche, Handyhalter, Ladegerät, Fahrradschloss, Regenkleidung, Stirnlampe. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt."
      },
      {
        "t": "Reinigung des Fahrzeugs für die Arbeit",
        "d": "Ein Auto in einem Zustand zu halten, in dem es Essen transportieren kann, oder ein Fahrrad fahrbereit zu halten, ist zum Arbeitsanteil absetzbar."
      }
    ]
  },
  {
    "kind": "tables",
    "h2": "Wie werden Autokosten berechnet?",
    "intro": "Unter beiden Methoden zählen nur Arbeitsfahrten, und bei einem Fahrer im Dienstplan nie die Fahrt von zu Hause zum Laden.",
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
    "note": "Wer regelmäßig fährt, ist nach ein paar Monaten über 5.000 Kilometer, und darüber ist das Fahrtenbuch normalerweise der größere Abzug: Benzin, Versicherung, Zulassung, Wartung, Abschreibung und Kreditzinsen zu deinem Arbeitsanteil."
  },
  {
    "kind": "answer",
    "h2": "Was muss ein Fahrer vorlegen können?",
    "paras": [
      "Jeder Abzug steht auf drei Punkten: du hast bezahlt, dir hat es niemand erstattet, und das Geld ging in das Einkommen, das du angibst. Bei einem Fahrer heißt das ein Fahrtenbuch oder eine Kilometeraufstellung, die Handyrechnung hinter deinem Arbeitsanteil und Belege für Tasche, Halterung und Ausrüstung.",
      "Ein Beleg, eine Rechnung, ein Kontoauszug oder ein Handyfoto mit Betrag, Datum, Anbieter und Gegenstand zählt jeweils, und alles davon muss fünf Jahre halten. Abzüge von zusammen 300 Dollar oder weniger im Jahr brauchen gar keinen schriftlichen Nachweis. Das ist nicht die 300-Dollar-Grenze, die entscheidet, ob ein Gegenstand sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "note",
    "label": "Der Punkt, der überrascht",
    "title": "Essen liefern und Fahrgäste fahren ist bei der GST nicht dasselbe.",
    "body": "Wenn du nur Essen und Pakete lieferst, wird die GST-Registrierung erst ab 75.000 Dollar Umsatz im Jahr Pflicht, und dahin kommen die wenigsten. In dem Moment, in dem du einen zahlenden Fahrgast mitnimmst, fällt diese Grenze weg.\n\nRide Sourcing verlangt die GST-Registrierung ab der allerersten Fahrt, unabhängig vom Umsatz, und damit auch Business Activity Statements. Wer unter der Woche Uber Eats fährt und freitagabends Fahrgäste mitnimmt, hat diese Linie stillschweigend überschritten."
  },
  {
    "kind": "traps",
    "h2": "Was machen Lieferfahrer falsch?",
    "intro": "Die überzogenen Abzüge sind hier größer als in jedem anderen Beruf, weil die Zahlen größer sind. Die übersehenen auch.",
    "wrong": [
      {
        "t": "Die ganze Handyrechnung",
        "d": "Hundert Prozent eines Vertrags anzusetzen, den du auch sonst nutzt, hält nicht stand, und es ist ein Punkt, den das ATO mit dem Rest der Erklärung abgleichen kann."
      },
      {
        "t": "Bußgelder",
        "d": "Ein Strafzettel, den du dir beim Hochtragen einer Bestellung eingefangen hast, bleibt nicht absetzbar. Ein Tempoverstoß auch nicht, so eng das Lieferfenster war."
      },
      {
        "t": "Essen während der Arbeit",
        "d": "Dein eigenes Abendessen zwischen zwei Lieferungen ist privat."
      },
      {
        "t": "Jeder Kilometer mit offener App",
        "d": "Die private Strecke wird nicht zur Arbeitsfahrt, weil die App lief. Eine Besorgung auf dem Weg zur Übergabe fällt raus, und bei einem angestellten Fahrer im Dienstplan fällt auch der normale Weg zum Laden raus."
      },
      {
        "t": "Kleine Plattformeinnahmen ganz weglassen",
        "d": "Uber, DoorDash und die anderen melden Fahrereinnahmen im Rahmen des Sharing-Economy-Meldesystems an das ATO. Deine Einnahmen sind ohnehin sichtbar, ein paar hundert Dollar Wochenendarbeit wegzulassen erzeugt also nur eine Abweichung."
      }
    ],
    "missed": [
      {
        "t": "Das Fahrtenbuch, wenn es klar besser gewesen wäre",
        "d": "Die Kilometerpauschale ist bei 5.000 Kilometern gedeckelt. Wer regelmäßig fährt, ist schnell darüber, und alles darüber ist einfach weg. Zwölf Wochen Fahrtenbuch, einmal geführt, gelten fünf Jahre."
      },
      {
        "t": "Zinsen, Versicherung, Zulassung und Abschreibung",
        "d": "Die gibt es nur über das Fahrtenbuch, und meistens sind sie der Grund, warum es gewinnt. Viele wählen die Pauschale, weil sie einfacher ist, und erfahren nie, was die Alternative gebracht hätte."
      },
      {
        "t": "Thermotasche und Handyhalter",
        "d": "Klein, offensichtlich, komplett absetzbar und mit dem Beleg im Müll. Dasselbe gilt für Helm, Licht und Regenkleidung auf dem Rad."
      },
      {
        "t": "Kosten vor der ersten Lieferung",
        "d": "Ausrüstung, die du gekauft hast, als du die ABN registriert und dich bei der Plattform angemeldet hast, ist in der Regel absetzbar. Der Abstand zwischen Kauf und Start zählt, also heb die Daten auf."
      },
      {
        "t": "Die ganze Erklärung, weil ABN-Fahrer nur mit Nachzahlung rechnen",
        "d": "Von Plattformauszahlungen wird nichts einbehalten, das Geld kommt also vollständig an und viele stellen sich auf eine Rechnung ein. Abzüge gegen dieses Einkommen verkleinern sie, und genau die bleiben am häufigsten weg."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was hängt daran, wie du fährst, statt an der Regel?",
    "paras": [
      "Uber Eats, DoorDash, Menulog und Amazon Flex beauftragen dich als Selbstständigen: ABN, kein Einbehalt, keine Superannuation. Wer für eine einzelne Pizzeria im Dienstplan fährt und einen Payslip bekommt, ist angestellt, mit TFN. Ein einzelner Laden, der deine Schichten festlegt, deine Arbeit beaufsichtigt, das Rad stellt und dann eine ABN verlangt, kann ein Arbeitgeber in Verkleidung sein.",
      "Wo die absetzbaren Fahrten beginnen, folgt daraus. Bei Angestellten ist der Weg zum Laden privat, nur Laden bis Übergabepunkt zählt. Mit ABN sind die Fahrten die Arbeit.",
      "Der steuerliche Wohnsitz entscheidet, wie der Gewinn überhaupt besteuert wird. Britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen. Das hängt von deinen eigenen Umständen ab und muss ordentlich geprüft werden."
    ]
  }
]

const FAQS = [
  {
    "question": "Brauche ich eine ABN für Uber Eats oder DoorDash?",
    "answer": "Ja. Diese Plattformen beauftragen Fahrer und Radkuriere als Selbstständige und nicht als Angestellte, also brauchst du eine ABN, bevor du bezahlt werden kannst.\n\nSie ersetzt keine TFN, die brauchst du weiterhin. Von deinen Auszahlungen wird nichts einbehalten, das Einkommen kommt also vollständig an und die Steuer darauf wird mit der Erklärung geregelt."
  },
  {
    "question": "Welche Methode für Autokosten soll ich nehmen?",
    "answer": "Das hängt davon ab, wie weit du fährst und was das Auto im Unterhalt kostet. Die Kilometerpauschale braucht keine Belege, ist aber bei 5.000 Arbeitskilometern im Jahr gedeckelt, und alles darüber ist verloren.\n\nEin Fahrtenbuch hat keine Grenze und erfasst Benzin, Versicherung, Zulassung, Wartung, Abschreibung und Kreditzinsen zu deinem Arbeitsanteil, im Gegenzug für zwölf zusammenhängende Wochen Aufzeichnungen und einen Beleg für jede Ausgabe."
  },
  {
    "question": "Kann ich meine Handyrechnung absetzen?",
    "answer": "Du kannst den arbeitsbezogenen Prozentsatz deines Handy- und Datenvertrags absetzen, also den Anteil, den du für die Fahrer-App, Navigation und Nachrichten zu Aufträgen nutzt.\n\nDie ganze Rechnung geht nicht, wenn du das Handy auch privat nutzt, was praktisch alle tun. Du brauchst also eine faire und ehrliche Grundlage für den Prozentsatz und etwas, das sie stützt."
  },
  {
    "question": "Muss ich mich für die GST registrieren?",
    "answer": "Bei reiner Essens- und Paketlieferung wird die GST-Registrierung erst ab 75.000 Dollar Umsatz im Jahr Pflicht, und die meisten Teilzeitfahrer kommen nicht in die Nähe.\n\nRide Sourcing ist anders: Wer zahlende Fahrgäste befördert, muss sich ab dem ersten Dollar registrieren, unabhängig vom Umsatz."
  },
  {
    "question": "Ich fahre Fahrrad statt Auto. Kann ich trotzdem etwas absetzen?",
    "answer": "Ja. Ein Fahrrad oder E-Scooter ist steuerlich kein Auto, die Kilometerpauschale gilt also nicht, aber du kannst den arbeitsbezogenen Anteil an Betriebs-, Reparatur- und Wartungskosten absetzen, dazu Sicherheitsausrüstung wie Helm, Licht und Warnkleidung.\n\nTeile fair zwischen Lieferfahrten und privater Nutzung auf."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/uber-doordash-rideshare-abn-working-holiday",
    "label": "Uber, DoorDash und deine ABN",
    "desc": "Warum die Plattformen eine brauchen und was sich damit ändert."
  },
  {
    "href": "/de/blog/bicycle-motorcycle-vehicle-deductions-working-holiday",
    "label": "Fahrrad, Roller und Auto absetzen",
    "desc": "Wie jedes Fahrzeug behandelt wird und welche Methode wozu passt."
  },
  {
    "href": "/de/blog/uber-eats-delivery-rider-working-holiday-australia",
    "label": "Liefern mit dem Working-Holiday-Visum",
    "desc": "Was die Arbeit wirklich zahlt, wenn die Kosten abgezogen sind."
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
  headline: "Lieferfahrer Australien: Auto, Handy, GST absetzen",
  description: "Deine Kilometer und der Arbeitsanteil am Handy sind das ganze Spiel. Bußgelder und Privatfahrten waren es nie.",
  url: `${SITE_URL}/de/expenses/delivery-drivers`,
  inLanguage: "de-DE",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/expenses/delivery-drivers#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/expenses/delivery-drivers`,
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
