import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "Zeitarbeit und Lager: was du absetzt",
  "description": "Schutzausrüstung je Einsatzort, Ticketverlängerungen, Werkzeug und Fahrten zwischen zwei Einsatzorten am selben Tag.",
  "keywords": [
    "Zeitarbeit Steuerabzüge Australien",
    "Lagerjob Steuer Australien",
    "Labour Hire Steuer Working Holiday",
    "Hilfsarbeiter Steuerabzüge Australien",
    "Fahrten zwischen Einsatzorten absetzen",
    "Staplerschein absetzbar Australien",
    "Backpacker Lagerarbeit Steuer",
    "mehrere Arbeitgeber Steuererklärung Australien"
  ],
  "alternates": {
    "canonical": "/de/expenses/labouring",
    "languages": {
      "en-AU": "/expenses/labouring",
      "de": "/de/expenses/labouring",
      "ja": "/ja/expenses/labouring",
      "x-default": "/expenses/labouring"
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
    "url": `${SITE_URL}/de/expenses/labouring`,
    "siteName": "Working Holiday Tax",
    "title": "Zeitarbeit und Lager in Australien: was absetzbar ist",
    "description": "Zwei Agenturen sind zwei Income Statements. Zwei Einsatzorte an einem Tag sind ein Abzug, den fast niemand macht."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Zeitarbeit und Lager in Australien: was absetzbar ist",
    "description": "Zwei Agenturen sind zwei Income Statements. Zwei Einsatzorte an einem Tag sind ein Abzug, den fast niemand macht."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Zeitarbeit und Lagerarbeit" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Liegt unser Honorar am Ende über der Rückerstattung, kommt die Differenz zu dir zurück.",
  "guaranteeBody": "Vier Agenturen und eine vergessene Einzelschicht in eine Erklärung zu ziehen ist hier normale Arbeit, und jeder Kunde ist auf einem 417 oder 462. Von unserem Team vorbereitet, dann von einem registrierten Steuerberater geprüft und freigegeben, bevor beim ATO eingereicht wird.",
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
    "name": "Zeitarbeit",
    "item": "/de/expenses/labouring"
  }
]

const HERO = {
  "kicker": "Lager, Umzüge, Garten und Events",
  "h1lead": "Zwei Agenturen sind zwei Income Statements.",
  "h1accent": "Zwei Einsatzorte sind ein Abzug.",
  "lede": "Eine vergessene Agentur kostet mehr als jeder fehlende Beleg, und eine Erklärung muss jede einzelne tragen."
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
    "h2": "Was können Hilfskräfte über eine Agentur absetzen?",
    "paras": [
      "Absetzbar sind Schutzausrüstung, die der Einsatzort verlangt, die Verlängerung eines Tickets, das du bereits hast, selbst gekauftes Werkzeug, die Fahrt zwischen zwei Einsatzorten am selben Tag und der arbeitsbezogene Anteil deines Handys. Was absetzbar ist, folgt der Arbeit, die du an diesem Tag wirklich gemacht hast, nicht der Jobbezeichnung im Agenturvertrag.",
      "Genau das macht Zeitarbeit anders. Eine Woche im Kühllager, eine Woche in einer Gartenkolonne und ein Wochenende beim Event-Abbau erzeugen drei verschiedene Kostenbilder, und der Abzug folgt der tatsächlichen Arbeit statt einem einzigen Berufslabel."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "Alles hier folgt dem Einsatzort. Frag, was der Einsatzort verlangt hat, nicht wie die Agentur dich genannt hat.",
    "items": [
      {
        "t": "Fahrten zwischen zwei Einsatzorten am selben Tag",
        "d": "Vormittags ein Lager, nachmittags ein anderer Ort ist Fahrt zwischen Arbeitsplätzen und absetzbar. Je wechselnder das Muster ist, ohne feste Basis und mit wechselnden Orten in der Woche, desto mehr davon lässt sich ansetzen. Die erste Fahrt von zu Hause bleibt der Arbeitsweg."
      },
      {
        "t": "Schutzausrüstung, die der Einsatzort verlangt hat",
        "d": "Sicherheitsschuhe mit Stahlkappe, Handschuhe, Warnkleidung, Schutzbrille, Gehörschutz, schnittfeste Ärmel. Absetzbar, wenn das Teil dich vor einer erkennbaren Gefahr in diesem konkreten Job schützt und du es selbst bezahlt hast."
      },
      {
        "t": "Verlängerung von Stapler-, Hubarbeitsbühnen- oder anderen Tickets",
        "d": "Die Verlängerung eines Tickets, das du hast und für die Arbeit nutzt, ist absetzbar. Das gilt für Stapler, Hubarbeitsbühne und White Card gleichermaßen, und immer nur für die Verlängerung."
      },
      {
        "t": "Selbst gekauftes Werkzeug",
        "d": "Manche Einsätze erwarten eigenes Basiswerkzeug. Alles, was du gekauft und nicht erstattet bekommen hast, ist absetzbar: bis 300 Dollar voll im Kaufjahr, darüber verteilt über die Nutzungsdauer."
      },
      {
        "t": "Schutzkleidung für Kälte und Wetter",
        "d": "Eine Kühlhausjacke für Arbeit im Kühl- oder Tiefkühllager, Regenkleidung für Gartenarbeit draußen. Das gilt als Schutzkleidung und nicht als Alltagskleidung, weil es dich vor einer Bedingung schützt, in die die Arbeit dich bringt."
      },
      {
        "t": "Arbeitsanteil deines Handys",
        "d": "Agenturen laufen über Nachrichten: Schichtangebote um sechs Uhr morgens, Adressen, Stundenzettel. Der arbeitsbezogene Prozentsatz deines Vertrags ist ein echter Abzug, wenn du dafür dein eigenes Handy nutzt."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was musst du über alle Einsätze hinweg aufheben?",
    "paras": [
      "Ein Abzug, drei Tests: du hast bezahlt, dir hat es niemand erstattet, und es diente dazu, das Einkommen zu verdienen, das du angibst. Über mehrere Einsätze heißt das Belege für selbst gekaufte Stiefel und Handschuhe, für die Ticketverlängerung und eine Notiz zu Daten, Orten und Entfernungen hinter den Fahrten.",
      "Der Nachweis kann ein Beleg, eine Rechnung, ein Kontoauszug oder ein Handyfoto sein, solange Betrag, Datum, Anbieter und Gegenstand daraus hervorgehen, und du hebst ihn fünf Jahre auf. Abzüge von zusammen 300 Dollar oder weniger im Jahr brauchen keinen schriftlichen Nachweis, du musst die Summe aber erklären können. Diese 300 Dollar sind nicht die, die entscheiden, ob ein Ausrüstungsteil sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "traps",
    "h2": "Was machen Zeitarbeitskräfte falsch?",
    "intro": "Die falschen Abzüge sind meist Kleidung und Arbeitsweg. Die übersehenen drehen sich fast alle um die Zahl der Arbeitgeber, und genau da verliert Zeitarbeit still Geld.",
    "wrong": [
      {
        "t": "Arbeitshose und Boots ohne Schutzfunktion",
        "d": "Schlichte Arbeitshose, T-Shirt, gewöhnliche Boots, die nur robust sind. Alltagskleidung bleibt privat, so schwer die Arbeit auch ist und so schnell sie verschleißt."
      },
      {
        "t": "Der Weg zu einem festen Einsatzort",
        "d": "Wenn eine Agentur dich zwei Monate lang in dasselbe Lager schickt, ist die Fahrt dorthin normaler Arbeitsweg und keine wechselnde Einsatztätigkeit. Absetzbar wird die Fahrt durch den Wechsel zwischen Arbeitsplätzen, nicht dadurch, dass eine Agentur dich geschickt hat."
      },
      {
        "t": "Ausrüstung, die die Agentur ausgegeben hat",
        "d": "Die meisten Agenturen stellen Warnkleidung und manchmal Schuhe. Wurde es dir ausgegeben oder erstattet, sind keine Kosten übrig."
      },
      {
        "t": "Das erste Ticket als Arbeitskost",
        "d": "Der Staplerschein, den du bezahlt hast, damit dich eine Agentur vorschlägt, ist eine Qualifikationskost, keine Arbeitskost. Verlängerungen im laufenden Einsatz sind absetzbar."
      },
      {
        "t": "Anzunehmen, die Agentur habe deine Steuer erledigt",
        "d": "Eine Agentur behält Steuer ein und meldet deinen Lohn. Sie gibt keine Erklärung für dich ab, setzt keine Kosten für dich an und prüft nicht, ob die anderen beiden Agenturen deine Daten richtig erfasst haben."
      }
    ],
    "missed": [
      {
        "t": "Ein Income Statement einer vergessenen Agentur",
        "d": "Der klassische Zeitarbeitsfehler. Drei Wochen bei einer Agentur im März, eine Schicht in einem anderen Bundesstaat im Juni, und die Erklärung geht ohne sie raus. Das ist schlimmer als ein vergessener Abzug, weil es später eine Korrektur bedeutet."
      },
      {
        "t": "Fahrten zwischen zwei Einsatzorten an einem Tag",
        "d": "Bei Agenturen, die eine Crew verschieben, sehr üblich, und fast nie abgesetzt, weil die Bewegung von jemand anderem entschieden wurde. Es bleibt absetzbare Fahrt zwischen Arbeitsplätzen."
      },
      {
        "t": "Selbst gekaufte Boots und Handschuhe zwischen zwei Einsätzen",
        "d": "Ausrüstung, die du gekauft hast, um den nächsten Job annehmen zu können, wird in Eile bezahlt und nie belegt. Jeder Gegenstand unter 300 Dollar ist ein voller Abzug im Kaufjahr."
      },
      {
        "t": "Eine bar bezahlte Ticketverlängerung",
        "d": "Verlängerungen für Stapler oder Hubarbeitsbühne sind günstig genug, um sie bis Juli zu vergessen, und absetzbar, sobald du mit dem Ticket bereits arbeitest."
      },
      {
        "t": "Wochen mit falschem Einbehalt",
        "d": "Eine neue Agentur, die deine Tax File Number Declaration noch nicht verarbeitet hat oder nicht als Arbeitgeber von Working Holiday Makern registriert ist, behält deutlich mehr als 15 Prozent ein. Das kommt mit der Erklärung zurück, die alle Agenturen zusammenführt, und nur dort."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Welche Teile hängen daran, wie dein Jahr lief?",
    "paras": [
      "Wie wechselnd die Arbeit war, entscheidet, wie viel deiner Fahrten absetzbar ist, und das ist eine Tatsachenfrage, keine Regel. Wie oft der Ort wechselte, ob es eine Basis gab, zu der du immer zurückkehrtest, ob die Agentur die Bewegung verlangt hat und wie die Woche aufgebaut war, fließt alles ein. Zwei Leute derselben Agentur können sehr unterschiedliche Fahrtabzüge haben, und eine Notiz zu Daten, Orten und Entfernungen macht den stärkeren Fall belegbar.",
      "Jede Agentur ist ein eigener Arbeitgeber, mit eigener Tax File Number Declaration, eigenem Einbehaltsverhältnis und eigenem Income Statement. Als Working Holiday Maker lautet die Antwort auf die Freibetragsfrage überall Nein, der doppelt beanspruchte Freibetrag ist also selten das Problem. Ein falsch angewandter Satz oder ein Arbeitgeber, der in der Erklärung fehlt, schon.",
      "Darunter liegt der steuerliche Wohnsitz. Britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen, mehr wert als alle Abzüge auf dieser Seite. Eine Stadt und lokale Agenturen über längere Zeit ist das Muster, das die Frage offen macht."
    ]
  }
]

const FAQS = [
  {
    "question": "Ich bin bei drei Agenturen registriert. Ändert das meine Steuer?",
    "answer": "Jede Agentur ist rechtlich ein eigener Arbeitgeber, du füllst also bei jeder eine eigene Tax File Number Declaration aus und bekommst am Jahresende von jeder ein eigenes Income Statement. Alles kommt in eine Erklärung. Als Working Holiday Maker wird dein Lohn zum Working-Holiday-Maker-Satz besteuert statt gegen einen Steuerfreibetrag, das eigentliche Risiko bei mehreren Agenturen ist also nicht der Satz, sondern dass eine davon fehlt."
  },
  {
    "question": "Kann ich Fahrten zwischen verschiedenen Einsatzorten absetzen?",
    "answer": "Meistens ja. Fahrten zwischen zwei oder mehr getrennten Arbeitsorten, etwa vormittags ein Lager und nachmittags ein anderer Ort, sind absetzbar, anders als dein normaler Weg von zu Hause zu einem festen Arbeitsplatz. Wie viel davon zählt, hängt davon ab, wie wechselnd das Muster ist, also notiere Daten, Orte und Entfernungen."
  },
  {
    "question": "Was ist steuerlich der Unterschied zwischen Zeitarbeit und Bau?",
    "answer": "Die Tests sind identisch, die Posten nicht. Baustellenarbeit verlangt meist eine White Card und typische Baustellen-Schutzausrüstung, während allgemeine Zeitarbeit Lager, Umzüge, Garten, Produktionslinien und Events abdeckt, wo die nötige Ausrüstung dem Einsatzort folgt und eine White Card oft gar nicht gebraucht wird. Wenn deine Einsätze speziell auf Baustellen sind, geht die Bau-Seite tiefer auf White-Card-Kosten und Baustellenausrüstung ein."
  },
  {
    "question": "Kann ich einen Staplerschein absetzen?",
    "answer": "Die Verlängerung ja, den ersten Erwerb nein. Nutzt du den Schein bereits im Einsatz, ist seine Verlängerung eine Kost der Arbeit. Der erste Schein lag davor und hat dich überhaupt erst vermittelbar gemacht, und das behandelt das ATO als privat. Für Hubarbeitsbühne, White Card und Führerschein zieht sie dieselbe Grenze."
  },
  {
    "question": "Ich hatte nur ein paar Schichten. Lohnt sich das überhaupt?",
    "answer": "Meistens ja, sofern du die Sachen selbst bezahlt und nichts erstattet bekommen hast. Auch wenige Schichten bringen Boots, Handschuhe, eine Ticketverlängerung oder Fahrten zwischen Einsatzorten mit sich, und jeder Dollar Abzug senkt das Einkommen, auf das die Steuer berechnet wird. Der Test ändert sich mit der Zahl der Schichten nicht: arbeitsbezogen, nicht erstattet und belegbar."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/labour-hire-agencies-working-holiday-australia",
    "label": "Zeitarbeitsfirmen in Australien",
    "desc": "Wer eigentlich dein Arbeitgeber ist, wenn dich eine Agentur vermittelt."
  },
  {
    "href": "/de/blog/white-card-australia-working-holiday",
    "label": "Die White Card und was sie dich kostet",
    "desc": "Wie du sie bekommst und warum die erste kein Abzug ist."
  },
  {
    "href": "/de/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "Die 300-Dollar-Sofortabschreibung für Werkzeug und Ausrüstung",
    "desc": "Warum jedes Teil einzeln geprüft wird und was ein Set daran ändert."
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
  headline: "Zeitarbeit und Lager in Australien: was absetzbar ist",
  description: "Zwei Agenturen sind zwei Income Statements. Zwei Einsatzorte an einem Tag sind ein Abzug, den fast niemand macht.",
  url: `${SITE_URL}/de/expenses/labouring`,
  inLanguage: "de-DE",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/expenses/labouring#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/expenses/labouring`,
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
