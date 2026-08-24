import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "FIFO: Schutzausrüstung und Zone Offset",
  "description": "Schutzausrüstung, Werkzeug, Ticketverlängerungen, Medicals und der Arbeitsanteil am Handy. Dazu, warum der Zone Tax Offset bei FIFO fast nie gilt.",
  "keywords": [
    "FIFO Steuerabzüge Australien",
    "Fly in Fly out Steuer Australien",
    "Zone Tax Offset FIFO",
    "FIFO Camp Unterkunft Steuer",
    "High Risk Work Licence absetzbar",
    "FIFO Schutzausrüstung absetzen",
    "Backpacker FIFO Job Steuer",
    "Minenjob Steuerabzüge Australien"
  ],
  "alternates": {
    "canonical": "/de/expenses/fifo",
    "languages": {
      "en-AU": "/expenses/fifo",
      "de": "/de/expenses/fifo",
      "ja": "/ja/expenses/fifo",
      "x-default": "/expenses/fifo"
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
    "url": `${SITE_URL}/de/expenses/fifo`,
    "siteName": "Working Holiday Tax",
    "title": "FIFO Australien: Schutzausrüstung, Tickets, Zone Offset",
    "description": "Camp-Essen und die Fahrt zum Flughafen sind nicht absetzbar. Der Zone Tax Offset ist vermutlich auch nicht deiner."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "FIFO Australien: Schutzausrüstung, Tickets, Zone Offset",
    "description": "Camp-Essen und die Fahrt zum Flughafen sind nicht absetzbar. Der Zone Tax Offset ist vermutlich auch nicht deiner."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "FIFO und Camp-Arbeit" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.",
  "guaranteeBody": "417 und 462 sind die einzigen Visa, für die wir Steuerarbeit annehmen, deshalb werden Zone Offset, Wohnsitzfrage und die Super in drei Fonds zusammen angesehen. Von einem registrierten Steuerberater geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
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
    "name": "FIFO",
    "item": "/de/expenses/fifo"
  }
]

const HERO = {
  "kicker": "Roster, Camps und abgelegene Standorte",
  "h1lead": "Der Zone Tax Offset ist vermutlich nicht deiner.",
  "h1accent": "Das hier schon.",
  "lede": "Zimmer im Camp, Kantine und Flug sind Kosten der Firma, nicht deine. Dir bleiben Schutzausrüstung, Ticketverlängerungen, Medicals und das Handy."
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
    "h2": "Was können FIFO-Beschäftigte absetzen?",
    "paras": [
      "Absetzbar sind selbst gekaufte Schutzausrüstung und das Waschen davon, Werkzeug und Geräte, die Verlängerung eines Tickets oder einer Lizenz, die du bereits hast, vom Arbeitgeber verlangte Medicals sowie Drogen- und Alkoholtests, die du selbst bezahlt hast, der arbeitsbezogene Anteil an Handy und Internet und Weiterbildung, die zu deiner jetzigen Arbeit gehört.",
      "Nicht auf dieser Liste steht alles, was FIFO teuer wirken lässt. Dein Zimmer im Camp und dein Essen in der Mess werden von der Firma gebucht und bezahlt, und der Flug zum Standort meistens auch. Ein Abzug gibt nur Geld zurück, das aus deiner Tasche geflossen ist."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "An allem hier hängt dieselbe Bedingung: du hast bezahlt, und es kam nicht aus dem Lager der Firma.",
    "items": [
      {
        "t": "Selbst gekaufte Schutzausrüstung und deren Wäsche",
        "d": "Overalls, Sicherheitsschuhe mit Stahlkappe, Handschuhe, Schutzbrille, Gehörschutz, Masken. Absetzbar, weil sie dich vor einer konkreten Gefahr auf dem Standort schützen. Das Waschen absetzbarer Schutzkleidung geht zum ATO-Satz: 1 Dollar pro reinem Arbeitswaschgang oder 50 Cent gemischt."
      },
      {
        "t": "Werkzeug und Geräte",
        "d": "Alles, was du für die Arbeit gekauft hast und nicht aus dem Lager bekommen hast. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt, darüber verteilt über die Nutzungsdauer. Ein zusammen gekauftes Werkzeugset ab 300 Dollar gilt als ein Gegenstand."
      },
      {
        "t": "Verlängerung von Tickets und Lizenzen",
        "d": "High Risk Work Licence, Working-at-Heights-Ticket, Staplerschein. Verlängerungen sind absetzbar, sobald du bereits in der Rolle arbeitest. Das erste nicht, auf derselben Grundlage wie die erste White Card oder der erste Führerschein."
      },
      {
        "t": "Vom Arbeitgeber verlangte Medicals und Tests",
        "d": "Viele Standorte verlangen ein Medical und Drogen- und Alkoholtests als Voraussetzung. Verlangt dein Arbeitgeber das für eine Rolle, die du bereits hast, und hast du selbst bezahlt, sind die Kosten absetzbar."
      },
      {
        "t": "Arbeitsanteil an Handy und Internet",
        "d": "Roster prüfen, Stundenzettel einreichen, verpflichtende Online-Einweisungen und Auffrischungen erledigen. Setze den arbeitsbezogenen Prozentsatz auf fairer, ehrlicher Grundlage an, nicht die ganze Rechnung."
      },
      {
        "t": "Weiterbildung zu deiner jetzigen Arbeit",
        "d": "Ein kurzer Kurs oder eine Einheit, die eine aktuelle Fähigkeit oder ein Ticket erhält, ist absetzbar, ebenso Reise und Unterkunft, wenn dein Arbeitgeber die Teilnahme außerhalb deiner Basis verlangt. Ein erstes Einstiegszertifikat, um für eine Rolle überhaupt in Frage zu kommen, ist es nicht."
      }
    ]
  },
  {
    "kind": "note",
    "label": "Der größte FIFO-Irrtum",
    "title": "In einer Zone zu arbeiten ist nicht dasselbe wie dort zu wohnen.",
    "body": "Seit einer Gesetzesänderung 2015 hängt der Zone Tax Offset davon ab, wo dein normaler Wohnsitz ist, und nicht davon, wohin dich der Roster bringt. Dein normaler Wohnsitz muss selbst mehr als 183 Tage im Einkommensjahr in einer ausgewiesenen abgelegenen Zone liegen. In eine Zone einzufliegen, während du zwischen den Swings in Perth, Brisbane oder Darwin wohnst, erfüllt diesen Test nicht, auch wenn du den größten Teil des Jahres körperlich am Standort bist. Das Camp ist nicht dein normaler Wohnsitz, weil es vorübergehend und an den Roster gebunden ist. Für die meisten Working Holiday Maker im FIFO-Roster gilt der Offset nicht, und das weiß man besser vorher, als wenn es schon in der Erklärung steht."
  },
  {
    "kind": "answer",
    "h2": "Was muss hinter einem FIFO-Abzug stehen?",
    "paras": [
      "Ein Abzug übersteht drei Fragen. Hast du bezahlt? Hat dir jemand das Geld zurückgegeben? Diente es dazu, das Einkommen zu verdienen, das du angibst? Auf dem Roster heißt das der Beleg für die Stiefel, die das Lager nicht ausgegeben hat, die Rechnung für das Medical und die Rechnung hinter deinem Handyanteil.",
      "Nachweis heißt Betrag, Datum, Anbieter und Gegenstand, auf einem Beleg, einer Rechnung, einem Kontoauszug oder einem Foto an der Kasse, und er muss fünf Jahre halten. Bei 300 Dollar Abzügen oder weniger im Jahr ist kein schriftlicher Nachweis nötig. Das sind nicht die 300 Dollar, die entscheiden, ob ein Werkzeug sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "traps",
    "h2": "Was machen FIFO-Beschäftigte falsch?",
    "intro": "Nirgends sonst auf dieser Website kursieren so viele selbstbewusst wiederholte Falschinformationen. Die folgenden Abzüge werden jedes Jahr angesetzt und halten nicht.",
    "wrong": [
      {
        "t": "Der Zone Tax Offset",
        "d": "Das mit Abstand am häufigsten angesetzte, worauf FIFO-Beschäftigte keinen Anspruch haben. Es kommt darauf an, wo du normal wohnst, nicht wohin du fliegst, und das Camp zählt nicht als Wohnen."
      },
      {
        "t": "Camp-Unterkunft und Verpflegung",
        "d": "Dein Arbeitgeber bucht und bezahlt Zimmer und Mess, und an wirklich abgelegenen Standorten ist das für ihn meist ein steuerbefreiter Sachbezug statt Einkommen für dich. So oder so hast du nie bezahlt, also gibt es nichts abzusetzen."
      },
      {
        "t": "Die Fahrt zum Flughafen vor dem Swing",
        "d": "Das ist der normale Arbeitsweg, so früh der Flug und so weit der Flughafen auch ist. Die enge Ausnahme für sperriges Werkzeug gibt es, greift aber selten bei Camp-Service-Rollen, wo es entweder nichts Sperriges gibt oder einen sicheren Platz dafür."
      },
      {
        "t": "Der Umzug nach Perth oder Brisbane für die Arbeit",
        "d": "Flüge, Fracht und vorübergehende Unterkunft für einen Umzug, den du gemacht hast, um FIFO-Arbeit aufzunehmen, sind private Umzugskosten. Sich in die Lage zu bringen, Einkommen zu verdienen, ist nicht dasselbe wie es zu verdienen."
      },
      {
        "t": "Eine erste High Risk Work Licence",
        "d": "Das Ticket, das du bezahlt hast, um eingestellt werden zu können, ist eine private Kost. Die Verlängerung, während du damit bereits arbeitest, ist absetzbar."
      }
    ],
    "missed": [
      {
        "t": "Selbst gekaufte Schutzausrüstung und deren Wäsche",
        "d": "Viele kaufen eigene Schuhe oder Handschuhe, statt auf das Lager zu warten, und setzen danach weder die Ausrüstung noch das Waschen zum veröffentlichten Satz ab."
      },
      {
        "t": "Selbst bezahlte Medicals und Drogen- und Alkoholtests",
        "d": "Wirklich absetzbar, wenn der Arbeitgeber sie für eine Rolle verlangt, die du bereits hast, und fast nie angesetzt, weil es sich nach Hürde statt nach Ausgabe anfühlt."
      },
      {
        "t": "Arbeitsanteil an Handy und Internet im Swing",
        "d": "Roster, Stundenzettel und Pflichteinweisungen laufen alle über ein privates Gerät. Ein überschaubarer, aber vollkommen berechtigter Abzug."
      },
      {
        "t": "Ticketverlängerungen über ein langes Roster-Jahr",
        "d": "Eine Verlängerung der High Risk Work Licence oder des Working-at-Heights-Tickets zwischen zwei Swings gerät bis zum Jahresende leicht aus dem Blick."
      },
      {
        "t": "Superannuation, die in mehreren Fonds zurückbleibt",
        "d": "FIFO zahlt gut, also ist der Super-Betrag größer als in den meisten Backpacker-Jobs. Er bleibt liegen, wenn du gehst, und muss als Departing Australia Superannuation Payment beantragt werden, sobald dein Visum abgelaufen ist."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was bleibt auf einer FIFO-Akte offen?",
    "paras": [
      "Der Zone Tax Offset ist meistens falsch, nicht unmöglich. Lag deine Basis während der Working Holiday in einer ausgewiesenen Zone, etwa eine Wohnung in einem abgelegenen Ort statt in einer Großstadt, ist die Frage offen.",
      "Die Ausnahme für sperriges Werkzeug zählt eher für Handwerker, die mit eigenem Werkzeugsatz einfliegen, als für Camp-Service-Rollen. Entschieden wird sie davon, was du transportiert hast und was der Standort an Lagerung bot, und geprüft wird sie auch, also solltest du die Fakten beschreiben können.",
      "Der steuerliche Wohnsitz ist bei FIFO die größte Frage, weil die Beträge größer sind. Britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen. Das hängt von deinen eigenen Umständen ab und muss ordentlich geprüft werden."
    ]
  }
]

const FAQS = [
  {
    "question": "Bekommen FIFO-Beschäftigte den Zone Tax Offset?",
    "answer": "Meistens nicht, und das ist der größte Irrtum bei FIFO-Steuern. Seit einer Gesetzesänderung 2015 hängt der Anspruch davon ab, dass dein normaler Wohnsitz mehr als 183 Tage im Jahr in einer ausgewiesenen abgelegenen Zone liegt, und nicht davon, wo du körperlich arbeitest. In eine Zone einzufliegen, während du zwischen den Swings in einer Großstadt wohnst, erfüllt diesen Test nicht, und Camp-Unterkunft gilt nicht als normaler Wohnsitz, weil sie vorübergehend und an den Roster gebunden ist."
  },
  {
    "question": "Kann ich Camp-Unterkunft oder Verpflegung absetzen?",
    "answer": "Nein. Zimmer und Essen am Standort organisiert und bezahlt dein Arbeitgeber, und an wirklich abgelegenen Standorten gilt das für ihn meist als steuerbefreiter Sachbezug. Weil du nie selbst für Zimmer oder Essen bezahlt hast, gibt es keine Ausgabe von dir abzusetzen. Ein Abzug kann nur Geld zurückgeben, das aus deiner Tasche geflossen ist."
  },
  {
    "question": "Kann ich die Fahrt zum Flughafen vor dem Swing absetzen?",
    "answer": "In fast allen Fällen nein. Die Fahrt von zu Hause zum Flughafen, von dem du abfliegst, ist normaler privater Arbeitsweg, genau wie bei allen anderen, egal wie früh der Flug ist. Es gibt eine enge Ausnahme, wenn du wirklich sperriges und notwendiges Werkzeug transportieren musst und es bei der Arbeit nicht sicher gelagert werden kann, aber das greift bei Camp-Service-Rollen selten."
  },
  {
    "question": "Kann ich meine High Risk Work Licence absetzen?",
    "answer": "Du kannst die Verlängerung einer Lizenz absetzen, die du bereits hast. Den ersten Erwerb nicht, weil diese Kosten dich für die Rolle qualifiziert haben und nicht zum Ausüben eines Jobs gehörten, den du schon hattest. Es ist dieselbe Unterscheidung zwischen erstem Erwerb und Verlängerung, die das ATO bei der White Card und beim Führerschein anwendet."
  },
  {
    "question": "Was kann ich im Roster für Handy und Internet absetzen?",
    "answer": "Den arbeitsbezogenen Anteil. Wenn du dein eigenes Handy oder Internet für den Job nutzt, um den Roster zu prüfen, Stundenzettel einzureichen oder verpflichtende Online-Einweisungen zu machen, ist dieser Anteil der Rechnung absetzbar. Du brauchst eine faire und ehrliche Schätzung des Prozentsatzes, denn die volle Rechnung eines Geräts, das du auch sonst nutzt, hält nicht stand."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "Die 300-Dollar-Sofortabschreibung für Werkzeug und Ausrüstung",
    "desc": "Warum jedes Teil einzeln geprüft wird und was ein Set daran ändert."
  },
  {
    "href": "/de/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "Die 1.000-Dollar-Pauschale ab 1. Juli 2026",
    "desc": "Pauschale ohne Belege oder tatsächliche Kosten. Du bekommst nur eins von beidem."
  },
  {
    "href": "/de/superannuation",
    "label": "Superannuation zurückholen, wenn du Australien verlässt",
    "desc": "Wie DASP funktioniert und was davon einbehalten wird."
  }
]

const SERVICES = [
  {
    "href": "/de/tax-return",
    "label": "Steuererklärung"
  },
  {
    "href": "/de/superannuation",
    "label": "Superannuation"
  },
  {
    "href": "/de/blog/tax-residency-working-holiday-makers",
    "label": "Steuerlicher Wohnsitz"
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
  headline: "FIFO Australien: Schutzausrüstung, Tickets, Zone Offset",
  description: "Camp-Essen und die Fahrt zum Flughafen sind nicht absetzbar. Der Zone Tax Offset ist vermutlich auch nicht deiner.",
  url: `${SITE_URL}/de/expenses/fifo`,
  inLanguage: "de-DE",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/expenses/fifo#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/expenses/fifo`,
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
